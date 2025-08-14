import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';
import { CrearUsuarioDto } from '../auth/dto/crear-usuario.dto';
import { UpdateUsuarioDto } from '../auth/dto/update-usuario.dto';


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

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: UpdateUsuarioDto) {
  return this.usuariosService.update(id, data);
}

@Delete(':id')
remove(@Param('id') id: number) {
  return this.usuariosService.remove(id);
}


}
