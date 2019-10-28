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
import { TipoFonte } from './tipoFonte.entity';
import { Noticia } from './noticia.entity';
import { Assunto } from './assunto.entity';
import { Descritor } from './descritor.entity';

@Entity('fonte', { schema: 'public' })
@Index('fonte_link_key', ['link'], { unique: true })
export class Fonte {
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
    name: 'link',
  })
  link: string | null;

  @Column('character varying', {
    nullable: true,
    name: 'descricao',
  })
  descricao: string | null;

  @ManyToOne(() => TipoFonte, tipoFonte => tipoFonte.fontes, {
    nullable: false,
  })
  @JoinColumn({ name: 'fk_tipo_fonte' })
  tipoFonte: TipoFonte | null;

  @OneToMany(() => Noticia, noticia => noticia.fonte)
  noticias: Noticia[];

  @ManyToMany(() => Assunto, assunto => assunto.fontes)
  assuntos: Assunto[];

  @ManyToMany(() => Descritor, descritor => descritor.fontes)
  descritores: Descritor[];
}
