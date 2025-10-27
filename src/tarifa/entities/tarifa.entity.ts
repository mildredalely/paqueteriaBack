import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum TipoProducto {
  DOCUMENTOS = 'DOCUMENTOS',
  PAQUETE = 'PAQUETE',
  OTRO = 'OTRO',
}

@Entity('tarifa')
export class Tarifa {
  @PrimaryGeneratedColumn()
  id_tarifa: number;

  @Column({ length: 100 })
  ubicacion_destino: string;

  @Column({
    type: 'enum',
    enum: TipoProducto,
  })
  tipo_producto: TipoProducto;

  @Column('decimal', { precision: 10, scale: 2 })
  precio_libra: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precio_extra_documentos: number;

  @Column({ default: false })
  mayoreo_aplica: boolean;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  umbral_mayoreo: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  precio_mayoreo: number;

  @Column({ type: 'text', nullable: true })
  observaciones: string;
}
