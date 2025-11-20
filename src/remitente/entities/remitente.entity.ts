import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Envio } from '../../envio/entities/envio.entity';

@Entity('remitentes')
export class Remitente {
  @PrimaryGeneratedColumn()
  id_remitente!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ length: 100 })
  apellido!: string;

  @Column({ unique: true, length: 100 })
  email!: string;

  @Column({ length: 15, nullable: true })
  telefono!: string;

  @Column({ length: 255, nullable: true })
  direccion!: string;

  @OneToMany(() => Envio, (envio) => envio.remitente)
  envios!: Envio[];
}
