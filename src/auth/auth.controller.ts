import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  

  @Post('login')
async login(@Body() loginDto: LoginDto) {
   console.log('Datos recibidos en login:', loginDto);
  const { nombre, password } = loginDto;
  return this.authService.login(nombre, password);
}


  @Post('register')
  async register(@Body() crearUsuarioDto: CrearUsuarioDto) {
    console.log('Register DTO:', crearUsuarioDto);
    return this.authService.register(crearUsuarioDto.nombre, crearUsuarioDto.password);
  }
}
