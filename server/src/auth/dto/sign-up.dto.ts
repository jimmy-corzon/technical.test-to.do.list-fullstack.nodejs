import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    example: 'Blindariesgos',
    description: 'Nombre del usuario',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  name: string;

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

export class SignUpResponseDto {
  @ApiProperty({
    example: {
      id: 'bda04c98-c94e-41f2-afba-8012750344c2',
      name: 'Blindariesgos',
      email: 'reto@blindariesgos.com',
      created_at: '2025-04-10T20:12:39.563Z',
      updated_at: '2025-04-10T20:12:39.563Z',
    },
    description: 'Ejemplo de respuesta al registrar un usuario - Usuario',
  })
  user: {
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Ejemplo de respuesta al registrar un usuario - Token',
  })
  token: string;
}
