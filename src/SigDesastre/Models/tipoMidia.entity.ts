import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Midia } from './midia.entity';

@Entity('tipo_midia', { schema: 'public' })
@Index('tipo_midia_nome_key', ['nome'], { unique: true })
export class TipoMidia {
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

  @OneToMany(() => Midia, midia => midia.tipoMidia)
  midias: Midia[];
}
