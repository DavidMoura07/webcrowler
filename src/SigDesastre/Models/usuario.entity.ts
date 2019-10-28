import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GrupoAcesso } from './grupoAcesso.entity';
import { Interesse } from './interesse.entity';

@Entity('usuario', { schema: 'public' })
@Index('usuario_email_key', ['email'], { unique: true })
export class Usuario {
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

  @Column('character varying', {
    nullable: true,
    unique: true,
    name: 'email',
  })
  email: string | null;

  @Column('character varying', {
    nullable: true,
    name: 'senha',
  })
  senha: string | null;

  @ManyToOne(() => GrupoAcesso, grupoAcesso => grupoAcesso.usuarios, {
    nullable: false,
  })
  @JoinColumn({ name: 'fk_grupo_acesso' })
  grupoAcesso: GrupoAcesso | null;

  @OneToMany(() => Interesse, interesse => interesse.usuario)
  interesses: Interesse[];
}
