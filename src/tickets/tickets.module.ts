import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from './entities/tickets.entity';
import { EstadoTicket } from './entities/estado-ticket.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, EstadoTicket, Usuario]), 
    UsuariosModule, 
  ],
  providers: [TicketsService],
  controllers: [TicketsController],
})
export class TicketsModule {}

