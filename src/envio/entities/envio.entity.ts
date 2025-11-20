import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Remitente } from 'src/remitente/entities/remitente.entity';
import { Mercancia } from 'src/mercancia/entities/mercancia.entity';
import { Destinatario } from 'src/destinatario/entities/destinatario.entity';

@Entity({ name: 'envio' })
export class Envio {
  @PrimaryGeneratedColumn()
  id_envio: number;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_envio: Date;

  @Column({ type: 'enum', enum: ['MX', 'US'] })
  origen: 'MX' | 'US';

  @Column({ type: 'enum', enum: ['MX', 'US'] })
  destino: 'MX' | 'US';

  @Column({ type: 'enum', enum: ['MX', 'US'] })
  tipo_cobro: 'MX' | 'US';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_total: number;

  @Column({ type: 'varchar', length: 50 })
  estado_envio: string;

  @Column({ type: 'boolean', default: false })
  firma_remitente: boolean;

  // 🔗 Relación con REMITENTE (N:1)
  @ManyToOne(() => Remitente, (remitente) => remitente.envios, { eager: true })
  @JoinColumn({ name: 'id_remitente' })
  remitente: Remitente;

  // 🔗 Relación con DESTINATARIO (N:1)
  @ManyToOne(() => Destinatario, (destinatario) => destinatario.envios, {
    eager: true,
  })
  @JoinColumn({ name: 'id_destinatario' })
  destinatario: Destinatario;

  // 🔗 Relación con MERCANCIA (1:N)
  @OneToMany(() => Mercancia, (mercancia) => mercancia.envio, { cascade: true })
  mercancias: Mercancia[];
}
