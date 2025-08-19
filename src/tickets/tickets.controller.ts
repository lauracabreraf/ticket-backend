import { Controller, Post, Body, Param, Get, Put, Delete, ParseIntPipe, Req, UseGuards, Patch } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { Ticket } from './entities/tickets.entity';


interface AuthRequest extends Request {
  user: { id: number };
}
@UseGuards(JwtAuthGuard)
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post('crear')
  async create(@Body() createTicketDto: CreateTicketDto, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.ticketsService.create(createTicketDto, userId);
  }

  @Get('mis-tickets')
  async getTicketsByUser(@Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.ticketsService.getTicketsByUserId(userId);
  }

  @Get('tickets-asignados')
  async getAssignedTickets(@Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.ticketsService.getAssignedTickets(userId);
  }

  @Delete('eliminar/:id')
  async deleteTicket(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.deleteTicket(id);
  }

  @Patch('editar/:id')
async updateTicket(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateData: Partial<CreateTicketDto>,
) {
  return this.ticketsService.updateTicket(id, updateData);
}


@Patch('cerrar/:id')
async cerrarTicket(
  @Param('id', ParseIntPipe) id: number,
  @Req() req: AuthRequest,
) {
  const userId = req.user.id;
  return this.ticketsService.cerrarTicket(id, userId);
}


@Get()
  listar(): Promise<Ticket[]> {
    return this.ticketsService.listarTicket();
  }

   }
