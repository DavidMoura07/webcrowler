import * as request from 'request-promise-native';
import { Noticia } from '../SigDesastre/Models/noticia.entity';
import { Fonte } from '../SigDesastre/Models/fonte.entity';
import { TipoFonte } from '../SigDesastre/Models/tipoFonte.entity';
import { GrupoAcesso } from '../SigDesastre/Models/grupoAcesso.entity';
import { TipoMidia } from '../SigDesastre/Models/tipoMidia.entity';
import { Midia } from '../SigDesastre/Models/midia.entity';

export class EstadoDeMinas {
    /**
     * getNews
     */

    public async getNews() {
        const baseUrl = 'https://www.em.com.br/busca/mariana';
        let page = 1;
        let offset = 10;
        const queryString = `?dtf=20/09/2019&dti=20/09/2009&json=63c055b-c8a7-4010-92c6-01803d6e752e&offset=${page *
            offset}&page=${page}`;
        var options = {
            uri: baseUrl + queryString,
            json: true,
        };
        const result = await request.get(options);

        for (page; page <= result.pages; page++) {
            const result = await request.get(options);
            await this.saveNews(result);
            console.log('Pagina ' + page + ' de ' + result.pages);
        }
        console.log('Quantidade de noticias encontradas: ' + result.hits);
    }

    private makeData(dataHora: string) {
        return (
            dataHora.substring(dataHora.length - 4, dataHora.length) +
            '-' +
            dataHora.substring(dataHora.length - 7, dataHora.length - 5) +
            '-' +
            dataHora.substring(dataHora.length - 10, dataHora.length - 8)
        );
    }

    private makeFonte(url) {
        return ({
            id: 3,
            nome: 'Estado de Minas',
            link: 'https://www.em.com.br',
            descricao: 'Belo Horizonte',
            tipoFonte: {
                id: 5,
                nome: 'Fontes Noticiosas',
            } as TipoFonte,
        } as unknown) as Fonte;
    }

    private makeGrupoAcesso() {
        return ({
            id: 1,
            nome: 'todos',
        } as unknown) as GrupoAcesso;
    }

    private makeMidias(linkMidia: string) {
        if (linkMidia) {
            return [
                {
                    nome: 'img',
                    link: linkMidia,
                    tipoMidia: {
                        id: 3,
                        nome: 'imagem',
                    } as TipoMidia,
                },
            ] as Midia[];
        } else {
            return [];
        }
    }

    private async saveNews(resultApi: any) {
        // let noticia = resultApi.news[0];

        resultApi.news.forEach(async noticia => {
            // var optionsEstadoMinas = {
            //     uri: noticia.url,
            // };
            // const conteudo = await request.get(optionsEstadoMinas);
            const data = this.makeData(noticia.date_time);

            const newsSigDesastre = new Noticia();
            newsSigDesastre.titulo = noticia.title;
            newsSigDesastre.descricao = noticia.description;
            newsSigDesastre.conteudo = null; //conteudo;
            newsSigDesastre.link = noticia.url;
            newsSigDesastre.dataPublicacao = data;
            newsSigDesastre.dataCriacao = data;
            newsSigDesastre.dataAtualizacao = data;
            newsSigDesastre.fonte = this.makeFonte('https://www.em.com.br/');
            newsSigDesastre.grupoAcesso = this.makeGrupoAcesso();
            newsSigDesastre.midias = this.makeMidias(noticia.imagem);
            newsSigDesastre.descritores = resultApi.args;

            const optionsSigDesastre = {
                method: 'POST',
                uri: 'https://sigdesastre.herokuapp.com/noticias',
                // uri: 'http://localhost:3000/noticias',
                body: newsSigDesastre,
                json: true, // Automatically stringifies the body to JSON
            };

            console.log(newsSigDesastre);
            const result = await request(optionsSigDesastre);
            console.log(result);
        });
    }
}
