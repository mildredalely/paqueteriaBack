import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Envio } from '../../envio/entities/envio.entity';

@Entity('destinatarios')
export class Destinatario {
  @PrimaryGeneratedColumn()
  id_destinatario!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ length: 100 })
  apellido!: string;

  @Column({ unique: false, length: 100, nullable: true })
  email!: string;

  @Column({ length: 15, nullable: true })
  telefono!: string;

  @Column({ length: 255, nullable: true })
  direccion!: string;

  @OneToMany(() => Envio, (envio) => envio.destinatario)
  envios!: Envio[];
}
