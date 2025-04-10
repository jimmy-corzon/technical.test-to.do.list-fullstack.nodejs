import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'reto@blindariesgos.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  email: string;

  @ApiProperty({
    example: 'Reto123',
    description: 'Contraseña del usuario',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({
    example: {
      id: 'bda04c98-c94e-41f2-afba-8012750344c2',
      name: 'Blindariesgos',
      email: 'reto@blindariesgos.com',
      created_at: '2025-04-10T20:12:39.563Z',
      updated_at: '2025-04-10T20:12:39.563Z',
    },
    description: 'Ejemplo de respuesta al iniciar sesión - Usuario',
  })
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Ejemplo de respuesta al iniciar sesión - Token',
  })
  token: string;
}
