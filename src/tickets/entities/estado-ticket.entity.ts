import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from './tickets.entity';

@Entity('estado_tickets')
export class EstadoTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => Ticket, ticket => ticket.estado)
  tickets: Ticket[];
}
