import { Injectable, UnauthorizedException, ConflictException, Inject, forwardRef } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Rol } from '../usuarios/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsuariosService))
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validarUsuario(nombre: string, pass: string) {
    const usuario = await this.usuariosService.encontrarPorNombre(nombre);
    if (!usuario) throw new UnauthorizedException('Usuario no encontrado');

    const passwordValido = await bcrypt.compare(pass, usuario.password);
    if (!passwordValido) throw new UnauthorizedException('Contraseña incorrecta');

    const { password, ...result } = usuario;
    return result;
  }

  
  async register(nombre: string, password: string) {
    const usuarioExistente = await this.usuariosService.encontrarPorNombre(nombre);
    if (usuarioExistente) {
      throw new ConflictException('El nombre de usuario ya está en uso');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = await this.usuariosService.crearUsuario({
      nombre,
      password: hashedPassword,
      rol: Rol.USUARIO,
    });

    const { password: _, ...usuarioSinPassword } = nuevoUsuario;
    return usuarioSinPassword;
  }


  async login(nombre: string, password: string) {
    const usuario = await this.validarUsuario(nombre, password);
    const payload = { sub: usuario.id, nombre: usuario.nombre, rol: usuario.rol };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
