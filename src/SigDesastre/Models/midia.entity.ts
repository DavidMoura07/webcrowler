import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Noticia } from './noticia.entity';
import { TipoMidia } from './tipoMidia.entity';

@Entity('midia', { schema: 'public' })
export class Midia {
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
    name: 'link',
  })
  link: string | null;

  @ManyToOne(() => Noticia, noticia => noticia.midias, {
    nullable: false,
  })
  @JoinColumn({ name: 'fk_noticia' })
  noticia: Noticia | null;

  @ManyToOne(() => TipoMidia, tipoMidia => tipoMidia.midias, {
    nullable: false,
  })
  @JoinColumn({ name: 'fk_tipo_midia' })
  tipoMidia: TipoMidia | null;
}
