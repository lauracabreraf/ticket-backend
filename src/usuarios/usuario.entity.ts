import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Rol {
  ADMIN = 'admin',
  AGENTE = 'agente',
  USUARIO = 'usuario',
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Rol,
    default: Rol.USUARIO,
  })
  rol: Rol;
}
