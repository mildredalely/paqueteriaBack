import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Envio } from 'src/envio/entities/envio.entity';
//import { Tarifa } from 'src/tarifa/entities/tarifa.entity';

export enum TipoProducto {
  ELECTRONICA = 'ELECTRONICA',
  ROPA = 'ROPA',
  ALIMENTO = 'ALIMENTO',
  OTRO = 'OTRO',
}

@Entity({ name: 'mercancia' })
export class Mercancia {
  @PrimaryGeneratedColumn()
  id_mercancia: number;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'enum', enum: TipoProducto })
  tipo_producto: TipoProducto;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  peso_libras: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor_declarado: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_unitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  // 🔗 Relación con ENVIO (N:1)
  @ManyToOne(() => Envio, (envio) => envio.mercancias)
  @JoinColumn({ name: 'id_envio' })
  envio: Envio;

  // 🔗 Relación opcional con TARIFA (N:1)
  //@ManyToOne(() => Tarifa, { nullable: true })
  //@JoinColumn({ name: 'id_tarifa' })
  //tarifa?: Tarifa;
}
