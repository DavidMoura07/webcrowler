import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Assunto } from './assunto.entity';
import { Noticia } from './noticia.entity';
import { Fonte } from './fonte.entity';

@Entity('descritor', { schema: 'public' })
export class Descritor {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column('character varying', {
    nullable: true,
    name: 'nome',
  })
  nome: string | null;

  @ManyToMany(() => Assunto, assunto => assunto.descritores)
  assuntos: Assunto[];

  @ManyToMany(() => Noticia, noticia => noticia.descritores, {
    nullable: false,
  })
  @JoinTable({ name: 'descritor_x_noticia' })
  noticias: Noticia[];

  @ManyToMany(() => Fonte, fonte => fonte.descritores, { nullable: false })
  @JoinTable({ name: 'descritor_x_fonte' })
  fontes: Fonte[];
}
