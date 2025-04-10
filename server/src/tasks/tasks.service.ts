import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crea una nueva tarea asociada al usuario.
   * @param createTaskDto Datos de la tarea a crear.
   * @param userId ID del usuario propietario.
   * @returns La tarea creada.
   */
  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    this.logger.log(
      `Usuario [${userId}] creando tarea: ${createTaskDto.title}`,
    );
    try {
      const task = await this.prisma.task.create({
        data: {
          title: createTaskDto.title,
          description: createTaskDto.description,
          is_private: createTaskDto.is_private ?? false,
          owner_id: userId,
        },
      });
      this.logger.log(`Tarea [${task.id}] creada por Usuario [${userId}]`);
      return task;
    } catch (error) {
      this.logger.error(
        `Error al crear tarea para Usuario [${userId}]: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw new Error('No se pudo crear la tarea.');
    }
  }

  /**
   * Obtiene todas las tareas PÚBLICAS de la aplicación.
   * @returns Lista de tareas públicas.
   */
  async findAllPublic(): Promise<Task[]> {
    this.logger.log('Obteniendo todas las tareas públicas');
    return this.prisma.task.findMany({
      where: { is_private: false },
      orderBy: { created_at: 'desc' },
    });
  }

  /**
   * Obtiene todas las tareas (públicas y privadas) pertenecientes a un usuario específico.
   * @param userId ID del usuario.
   * @returns Lista de tareas del usuario.
   */
  async findAllByUser(userId: string): Promise<Task[]> {
    this.logger.log(`Obteniendo todas las tareas del Usuario [${userId}]`);
    return this.prisma.task.findMany({
      where: { owner_id: userId },
      orderBy: { created_at: 'desc' },
    });
  }

  /**
   * Busca una tarea específica por su ID.
   * Verifica si la tarea es pública o si pertenece al usuario solicitante.
   * @param id ID de la tarea.
   * @param userId ID del usuario que realiza la solicitud.
   * @returns La tarea encontrada.
   * @throws NotFoundException si la tarea no existe.
   * @throws ForbiddenException si la tarea es privada y no pertenece al usuario.
   */
  async findOne(id: string, userId: string): Promise<Task> {
    this.logger.log(`Usuario [${userId}] buscando tarea [${id}]`);
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      this.logger.warn(
        `Tarea [${id}] no encontrada (solicitada por Usuario [${userId}])`,
      );
      throw new NotFoundException(`Tarea con ID ${id} no encontrada.`);
    }

    if (task.is_private && task.owner_id !== userId) {
      this.logger.warn(
        `Usuario [${userId}] intentó acceder a Tarea privada [${id}] que no le pertenece.`,
      );
      throw new ForbiddenException(
        'No tienes permiso para acceder a esta tarea.',
      );
    }

    this.logger.log(
      `Tarea [${id}] encontrada y accesible para Usuario [${userId}]`,
    );
    return task;
  }

  /**
   * Actualiza una tarea específica.
   * Solo el propietario de la tarea puede actualizarla.
   * @param id ID de la tarea a actualizar.
   * @param updateTaskDto Datos a actualizar.
   * @param userId ID del usuario que realiza la solicitud.
   * @returns La tarea actualizada.
   * @throws NotFoundException si la tarea no existe.
   * @throws ForbiddenException si el usuario no es el propietario de la tarea.
   */
  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    userId: string,
  ): Promise<Task> {
    this.logger.log(`Usuario [${userId}] intentando actualizar tarea [${id}]`);
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      this.logger.warn(
        `Intento de actualizar Tarea [${id}] no encontrada (por Usuario [${userId}])`,
      );
      throw new NotFoundException(`Tarea con ID ${id} no encontrada.`);
    }

    if (task.owner_id !== userId) {
      this.logger.warn(
        `Usuario [${userId}] intentó actualizar Tarea [${id}] que no le pertenece.`,
      );
      throw new ForbiddenException(
        'No tienes permiso para actualizar esta tarea.',
      );
    }

    try {
      const updatedTask = await this.prisma.task.update({
        where: { id },
        data: {
          ...updateTaskDto,
          ...(updateTaskDto.is_private !== undefined && {
            is_private: updateTaskDto.is_private,
          }),
          ...(updateTaskDto.completed !== undefined && {
            completed: updateTaskDto.completed,
          }),
        },
      });
      this.logger.log(`Tarea [${id}] actualizada por Usuario [${userId}]`);
      return updatedTask;
    } catch (error) {
      this.logger.error(
        `Error al actualizar Tarea [${id}] por Usuario [${userId}]: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw new Error('No se pudo actualizar la tarea.');
    }
  }

  /**
   * Elimina una tarea específica.
   * Solo el propietario de la tarea puede eliminarla.
   * @param id ID de la tarea a eliminar.
   * @param userId ID del usuario que realiza la solicitud.
   * @returns La tarea que fue eliminada.
   * @throws NotFoundException si la tarea no existe.
   * @throws ForbiddenException si el usuario no es el propietario de la tarea.
   */
  async remove(id: string, userId: string): Promise<Task> {
    this.logger.log(`Usuario [${userId}] intentando eliminar tarea [${id}]`);
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      this.logger.warn(
        `Intento de eliminar Tarea [${id}] no encontrada (por Usuario [${userId}])`,
      );
      throw new NotFoundException(`Tarea con ID ${id} no encontrada.`);
    }

    if (task.owner_id !== userId) {
      this.logger.warn(
        `Usuario [${userId}] intentó eliminar Tarea [${id}] que no le pertenece.`,
      );
      throw new ForbiddenException(
        'No tienes permiso para eliminar esta tarea.',
      );
    }

    try {
      await this.prisma.task.delete({
        where: { id },
      });
      this.logger.log(`Tarea [${id}] eliminada por Usuario [${userId}]`);
      return task;
    } catch (error) {
      this.logger.error(
        `Error al eliminar Tarea [${id}] por Usuario [${userId}]: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw new Error('No se pudo eliminar la tarea.');
    }
  }
}
