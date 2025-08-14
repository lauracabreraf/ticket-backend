import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { JwtStrategy } from './jwt.strategy';



@Module({
  imports: [
  forwardRef(() => UsuariosModule),
  PassportModule,
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1h' },
  }),
],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
