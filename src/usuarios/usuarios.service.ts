import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario, Rol } from './usuario.entity';
import * as bcrypt from 'bcrypt';

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
}
