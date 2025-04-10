import { IsString, IsNotEmpty, MinLength, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Mi tarea 1',
    description: 'Título de la tarea',
  })
  @IsString()
  @IsNotEmpty({ message: 'El título es requerido' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  title: string;

  @ApiProperty({
    example: 'Esta es una tarea de ejemplo',
    description: 'Descripción de la tarea',
  })
  @IsString()
  @IsNotEmpty({ message: 'La descripción es requerida' })
  @MinLength(10, {
    message: 'La descripción debe tener al menos 10 caracteres',
  })
  description: string;

  @ApiProperty({
    example: false,
    description: '¿La tarea está completa?',
  })
  @IsBoolean({ message: 'El valor de "completada" debe ser verdadero o falso' })
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return typeof value === 'boolean' ? value : false;
  })
  completed?: boolean = false;

  @ApiProperty({
    example: false,
    description: '¿La tarea es privada?',
  })
  @IsBoolean({ message: 'El valor de "privada" debe ser verdadero o falso' })
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return typeof value === 'boolean' ? value : false;
  })
  is_private?: boolean = false;
}

export class CreateTaskResponseDto {
  @ApiProperty({
    example: 'bda04c98-c94e-41f2-afba-8012750344c2',
    description: 'ID único de la tarea',
  })
  id: string;

  @ApiProperty({
    example: 'Mi tarea 1',
    description: 'Título de la tarea',
  })
  title: string;

  @ApiProperty({
    example: 'Esta es una tarea de ejemplo',
    description: 'Descripción de la tarea',
  })
  description: string;

  @ApiProperty({
    example: false,
    description: '¿La tarea está completa?',
  })
  completed: boolean;

  @ApiProperty({
    example: false,
    description: '¿La tarea es privada?',
  })
  is_private: boolean;

  @ApiProperty({
    example: 'bda04c98-c94e-41f2-afba-8012750344c2',
    description: 'ID del propietario de la tarea',
  })
  owner_id: string;

  @ApiProperty({
    example: '2025-04-10T20:12:39.563Z',
    description: 'Fecha de creación de la tarea',
  })
  created_at: string;

  @ApiProperty({
    example: '2025-04-10T20:12:39.563Z',
    description: 'Fecha de última actualización de la tarea',
  })
  updated_at: string;
}
