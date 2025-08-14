import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.nombre, loginDto.password);
  }

  @Post('register')
  async register(@Body() crearUsuarioDto: CrearUsuarioDto) {
    console.log('Register DTO:', crearUsuarioDto);
    return this.authService.register(crearUsuarioDto.nombre, crearUsuarioDto.password);
  }
}
