import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  titulo: string;

  @IsString()
  descripcion: string;

  @IsInt()
  estadoId: number;

  @IsString()
  @IsOptional()
  prioridad?: string;
}

