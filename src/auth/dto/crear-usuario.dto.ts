import { IsNotEmpty, IsString } from 'class-validator';

export class CrearUsuarioDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  
}
