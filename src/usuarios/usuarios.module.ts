import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from '../usuarios/usuario.entity';
import { AuthModule } from '../auth/auth.module'; 
import { JwtModule } from '@nestjs/jwt';


@Module({
 imports: [
  forwardRef(() => AuthModule), 
  TypeOrmModule.forFeature([Usuario]), 
  JwtModule.register({ secret: process.env.JWT_SECRET }),
],
 
  providers: [UsuariosService],
  controllers: [UsuariosController, ],
   exports: [UsuariosService, TypeOrmModule],
})
export class UsuariosModule {}


