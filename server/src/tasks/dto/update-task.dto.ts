import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    example: 'Mi tarea 1',
    description: 'Título de la tarea',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'El título es requerido' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  title: string;

  @IsOptional()
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

  @IsOptional()
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

  @IsOptional()
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

export class UpdateTaskResponseDto {
  @ApiProperty({
    example: 'bda04c98-c94e-41f2-afba-8012750344c2',
    description: 'ID único de la tarea',
  })
  id: string;

  @ApiProperty({
    example: 'Mi tarea actualizada',
    description: 'Título de la tarea actualizada',
  })
  title: string;

  @ApiProperty({
    example: 'Esta es una descripción actualizada de la tarea',
    description: 'Descripción de la tarea actualizada',
  })
  description: string;

  @ApiProperty({
    example: true,
    description: '¿La tarea está completa?',
  })
  completed: boolean;

  @ApiProperty({
    example: true,
    description: '¿La tarea es privada?',
  })
  is_private: boolean;

  @ApiProperty({
    example: '2025-04-10T20:12:39.563Z',
    description: 'Fecha de creación de la tarea',
  })
  created_at: Date;

  @ApiProperty({
    example: '2025-04-11T15:45:00.000Z',
    description: 'Fecha de última actualización de la tarea',
  })
  updated_at: Date;
}
