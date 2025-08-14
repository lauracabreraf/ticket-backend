import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';
import { CrearUsuarioDto } from '../auth/dto/crear-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
crear(@Body() data: CrearUsuarioDto) {
  return this.usuariosService.crearUsuario(data);
}


  @Get()
  listar(): Promise<Usuario[]> {
    return this.usuariosService.listarUsuarios();
  }
}
