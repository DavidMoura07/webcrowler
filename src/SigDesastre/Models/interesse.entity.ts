import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Assunto } from './assunto.entity';
import { Usuario } from './usuario.entity';

@Entity('interesse', { schema: 'public' })
export class Interesse {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column('character varying', {
    nullable: true,
    name: 'descritores',
  })
  descritores: string | null;

  @ManyToOne(() => Assunto, assunto => assunto.interesses, {
    nullable: false,
  })
  @JoinColumn({ name: 'fk_assunto' })
  assunto: Assunto | null;

  @ManyToOne(() => Usuario, usuario => usuario.interesses, {
    nullable: false,
  })
  @JoinColumn({ name: 'fk_usuario' })
  usuario: Usuario | null;
}
