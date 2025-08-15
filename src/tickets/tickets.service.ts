import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/tickets.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Usuario } from '../usuarios/usuario.entity';
import { EstadoTicket } from './entities/estado-ticket.entity';



@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,

    @InjectRepository(EstadoTicket)
    private estadoRepository: Repository<EstadoTicket>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createTicketDto: CreateTicketDto, userId: number): Promise<Ticket> {
    const usuario = await this.usuarioRepository.findOne({ where: { id: userId } });
    if (!usuario) throw new Error('Usuario no encontrado');

    const estado = await this.estadoRepository.findOne({ where: { id: createTicketDto.estadoId } });
    if (!estado) throw new Error('Estado no encontrado');

    const newTicket = this.ticketRepository.create({
      ...createTicketDto,
      estado,
      creadoPor: usuario,
    });

    return this.ticketRepository.save(newTicket);
  }

  async getTicketsByUserId(userId: number): Promise<Ticket[]> {
    return this.ticketRepository.find({ where: { creadoPor: { id: userId } } });
  }

  async getAssignedTickets(userId: number): Promise<Ticket[]> {
    return this.ticketRepository.find({ where: { asignadoA: { id: userId } } });
  }

  async updateTicket(id: number, updateData: Partial<CreateTicketDto>): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({ where: { id } });
    if (!ticket) throw new Error('Ticket no encontrado');

    Object.assign(ticket, updateData);
    return this.ticketRepository.save(ticket);
  }

  async deleteTicket(id: number): Promise<void> {
    const ticket = await this.ticketRepository.findOne({ where: { id } });
    if (!ticket) throw new Error('Ticket no encontrado');

    await this.ticketRepository.remove(ticket);
  }
}
