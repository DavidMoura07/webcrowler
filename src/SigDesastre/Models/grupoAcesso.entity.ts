import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Noticia } from './noticia.entity';
import { Usuario } from './usuario.entity';

@Entity('grupo_acesso', { schema: 'public' })
@Index('grupo_acesso_nome_key', ['nome'], { unique: true })
export class GrupoAcesso {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column('character varying', {
    nullable: true,
    unique: true,
    name: 'nome',
  })
  nome: string | null;

  @OneToMany(() => Noticia, noticia => noticia.grupoAcesso)
  noticias: Noticia[];

  @OneToMany(() => Usuario, usuario => usuario.grupoAcesso)
  usuarios: Usuario[];
}
