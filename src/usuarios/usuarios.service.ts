import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario, Rol } from './usuario.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUsuarioDto } from '../auth/dto/update-usuario.dto';




@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  
  async crearUsuario(data: Partial<Usuario>): Promise<Usuario> {
    
    if (!data.nombre) {
      throw new BadRequestException('El nombre de usuario es obligatorio');
    }

    
    const usuarioExistente = await this.encontrarPorNombre(data.nombre);
    if (usuarioExistente) {
      throw new ConflictException('El usuario ya existe');
    }

    
    if (!data.rol) {
      data.rol = Rol.USUARIO;
    }

    
    if (!data.password) {
      throw new BadRequestException('La contraseña es obligatoria');
    }
    const saltRounds = 10;
    data.password = await bcrypt.hash(data.password, saltRounds);

 
    const usuario = this.usuariosRepository.create(data);
    return this.usuariosRepository.save(usuario);
  }

  


  async encontrarPorNombre(nombre: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({ where: { nombre } });
  }


  async listarUsuarios(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }



  async update(id: number, data: UpdateUsuarioDto): Promise<Usuario> {
  const usuario = await this.usuariosRepository.findOneBy({ id });
  if (!usuario) throw new Error('Usuario no encontrado');

  if (data.password) {
    const saltRounds = 10;
    data.password = await bcrypt.hash(data.password, saltRounds);
  }

  Object.assign(usuario, data);
  return this.usuariosRepository.save(usuario);

}


 async remove(id: number): Promise<string> {
  const usuario = await this.usuariosRepository.findOneBy({ id });
  if (!usuario) throw new Error('Usuario no encontrado');

  await this.usuariosRepository.delete(id);
  return 'Usuario eliminado correctamente';
}


}
