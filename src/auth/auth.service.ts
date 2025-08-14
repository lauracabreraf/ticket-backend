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
    console.log('--- VALIDANDO USUARIO ---');
    console.log('Nombre recibido:', nombre);
    console.log('Password recibido raw:', pass);
    console.log('Password recibido codes:', Array.from(pass).map(c => c.charCodeAt(0)));

    const usuario = await this.usuariosService.encontrarPorNombre(nombre);
    if (!usuario) {
      console.log('Usuario no encontrado');
      throw new UnauthorizedException('Usuario no encontrado');
    }

    console.log('Usuario encontrado:', usuario.nombre);
    console.log('Hash en DB:', usuario.password);

    
    const passwordValido = await bcrypt.compare(pass.trim(), usuario.password);
    console.log('¿Password coincide?:', passwordValido);

    if (!passwordValido) throw new UnauthorizedException('Contraseña incorrecta');

    const { password, ...result } = usuario;
    return result;
  }

  async register(nombre: string, password: string) {
    const usuarioExistente = await this.usuariosService.encontrarPorNombre(nombre);
    if (usuarioExistente) {
      throw new ConflictException('El nombre de usuario ya está en uso');
    }

    
    const nuevoUsuario = await this.usuariosService.crearUsuario({
      nombre,
      password,
      rol: Rol.USUARIO,
    });

    const { password: _, ...usuarioSinPassword } = nuevoUsuario;
    return usuarioSinPassword;
  }

  async login(nombre: string, password: string) {
    console.log('--- LOGIN ---');
    const usuario = await this.validarUsuario(nombre, password);
    console.log('Usuario validado:', usuario);

    const payload = { sub: usuario.id, nombre: usuario.nombre, rol: usuario.rol };
    const token = this.jwtService.sign(payload);
    console.log('Token generado:', token);

    return {
      access_token: token,
    };
  }
}
