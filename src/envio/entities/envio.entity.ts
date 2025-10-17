import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Remitente } from '../../remitente/entities/remitente.entity';
// import { Destinatario } from '../../destinatario/entities/destinatario.entity';
// import { Mercancia } from '../../mercancia/entities/mercancia.entity';

@Entity('envios')
export class Envio {
  @PrimaryGeneratedColumn()
  id_envio!: number;

  @Column({ type: 'date' })
  fecha_envio!: Date;

  @Column({ length: 100 })
  origen!: string;

  @Column({ length: 100 })
  destino!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costo!: number;

  @Column({ length: 50, default: 'pendiente' })
  estado!: string;

  // Relaciones
  @ManyToOne(() => Remitente, (remitente) => remitente.envios, { eager: true })
  remitente!: Remitente;

  // @ManyToOne(() => Destinatario, (destinatario) => destinatario.envios, { eager: true })
  // destinatario!: Destinatario;

  // @OneToMany(() => Mercancia, (mercancia) => mercancia.envio)
  // mercancias!: Mercancia[];
}
