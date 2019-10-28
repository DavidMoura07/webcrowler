import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Fonte } from './fonte.entity';
import { GrupoAcesso } from './grupoAcesso.entity';
import { Midia } from './midia.entity';
import { Descritor } from './descritor.entity';

@Entity('noticia', { schema: 'public' })
@Index('noticia_link_key', ['link'], { unique: true })
export class Noticia {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column('character varying', {
    nullable: true,
    name: 'titulo',
  })
  titulo: string | null;

  @Column('character varying', {
    nullable: true,
    name: 'descricao',
  })
  descricao: string | null;

  @Column('character varying', {
    nullable: true,
    name: 'conteudo',
  })
  conteudo: string | null;

  @Column('character varying', {
    nullable: true,
    unique: true,
    name: 'link',
  })
  link: string | null;

  @Column('date', {
    nullable: true,
    name: 'data_publicacao',
  })
  dataPublicacao: string | null;

  @Column('date', {
    nullable: true,
    name: 'data_criacao',
  })
  dataCriacao: string | null;

  @Column('date', {
    nullable: true,
    name: 'data_atualizacao',
  })
  dataAtualizacao: string | null;

  @ManyToOne(() => Fonte, fonte => fonte.noticias, { nullable: false })
  @JoinColumn({ name: 'fk_fonte' })
  fonte: Fonte | null;

  @ManyToOne(() => GrupoAcesso, grupoAcesso => grupoAcesso.noticias, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'fk_grupo_acesso' })
  grupoAcesso: GrupoAcesso | null;

  @OneToMany(() => Midia, midia => midia.noticia, { eager: true })
  midias: Midia[];

  @ManyToMany(() => Descritor, descritor => descritor.noticias, { eager: true })
  descritores: Descritor[];
}
