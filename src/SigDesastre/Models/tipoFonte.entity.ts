import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Fonte } from './fonte.entity';

@Entity('tipo_fonte', { schema: 'public' })
@Index('tipo_fonte_nome_key', ['nome'], { unique: true })
export class TipoFonte {
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

  @OneToMany(() => Fonte, fonte => fonte.tipoFonte)
  fontes: Fonte[];
}
