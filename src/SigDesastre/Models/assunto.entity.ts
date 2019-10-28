import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Interesse } from './interesse.entity';
import { Fonte } from './fonte.entity';
import { Descritor } from './descritor.entity';

@Entity('assunto', { schema: 'public' })
@Index('assunto_nome_key', ['nome'], { unique: true })
export class Assunto {
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

  @Column('character varying', {
    nullable: true,
    name: 'descricao',
  })
  descricao: string | null;

  @OneToMany(() => Interesse, interesse => interesse.assunto)
  interesses: Interesse[];

  @ManyToMany(() => Fonte, fonte => fonte.assuntos, { nullable: false })
  @JoinTable({ name: 'assunto_x_fonte' })
  fontes: Fonte[];

  @ManyToMany(() => Descritor, descritor => descritor.assuntos, {
    nullable: false,
  })
  @JoinTable({ name: 'assunto_x_descritor' })
  descritores: Descritor[];
}
