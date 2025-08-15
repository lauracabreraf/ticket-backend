import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from '../tickets/entities/tickets.entity';

export enum Rol {
  ADMIN = 'admin',
  AGENTE = 'agente',
  USUARIO = 'usuario',
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Rol,
    default: Rol.USUARIO,
  })
  rol: Rol;


  @OneToMany(() => Ticket, (ticket) => ticket.creadoPor)
  ticketsCreados: Ticket[];



  
  @OneToMany(() => Ticket, (ticket) => ticket.asignadoA)
  ticketsAsignados: Ticket[];

}
