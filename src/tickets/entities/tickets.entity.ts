import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Usuario } from '../../usuarios/usuario.entity';
import { EstadoTicket } from './estado-ticket.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @ManyToOne(() => EstadoTicket, estado => estado.tickets, { eager: true })
  estado: EstadoTicket;

  @Column({ nullable: true })
  prioridad?: string;

  @ManyToOne(() => Usuario, usuario => usuario.ticketsCreados, { eager: true })
  creadoPor: Usuario;

  @ManyToOne(() => Usuario, usuario => usuario.ticketsAsignados, { nullable: true, eager: true })
  asignadoA?: Usuario;

  @Column({ nullable: true })
  adjunto?: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;
}
