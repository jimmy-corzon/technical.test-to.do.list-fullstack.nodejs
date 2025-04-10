import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto, CreateTaskResponseDto } from './dto/create-task.dto';
import { UpdateTaskDto, UpdateTaskResponseDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthenticatedRequest } from 'src/auth/auth.type';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  private readonly logger = new Logger(TasksController.name);
  constructor(private readonly tasksService: TasksService) {}

  /**
   * POST /tasks
   * Crea una nueva tarea para el usuario autenticado.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: 201,
    description: 'Tarea creada exitosamente.',
    type: CreateTaskResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const userId = req.user.id;
    this.logger.log(`Request de Usuario [${userId}] para crear tarea`);
    return this.tasksService.create(createTaskDto, userId);
  }

  /**
   * GET /tasks/my-tasks
   * Obtiene todas las tareas (privadas y públicas) del usuario autenticado.
   */
  @Get('my-tasks')
  @ApiOperation({ summary: 'Obtener tareas del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Lista de tareas del usuario.' })
  findMyTasks(@Request() req: AuthenticatedRequest) {
    const userId = req.user.id;
    this.logger.log(`Request de Usuario [${userId}] para obtener sus tareas`);
    return this.tasksService.findAllByUser(userId);
  }

  /**
   * GET /tasks/public
   * Obtiene todas las tareas públicas de cualquier usuario.
   */
  @Get('public')
  @ApiOperation({ summary: 'Obtener tareas públicas' })
  @ApiResponse({ status: 200, description: 'Lista de tareas públicas.' })
  findPublicTasks(@Request() req: AuthenticatedRequest) {
    this.logger.log(
      `Request de Usuario [${req.user.id}] para obtener tareas públicas`,
    );
    return this.tasksService.findAllPublic();
  }

  /**
   * GET /tasks/:id
   * Obtiene una tarea específica por ID.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarea específica por ID' })
  @ApiResponse({ status: 200, description: 'Tarea encontrada.' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada.' })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    const userId = req.user.id;
    this.logger.log(
      `Request de Usuario [${userId}] para obtener tarea [${id}]`,
    );
    return this.tasksService.findOne(id, userId);
  }

  /**
   * PATCH /tasks/:id
   * Actualiza una tarea específica.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una tarea específica' })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({
    status: 200,
    description: 'Tarea actualizada exitosamente.',
    type: UpdateTaskResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado para actualizar esta tarea.',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const userId = req.user.id;
    this.logger.log(
      `Request de Usuario [${userId}] para actualizar tarea [${id}]`,
    );
    return this.tasksService.update(id, updateTaskDto, userId);
  }

  /**
   * DELETE /tasks/:id
   * Elimina una tarea específica.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar una tarea específica' })
  @ApiResponse({ status: 200, description: 'Tarea eliminada exitosamente.' })
  @ApiResponse({
    status: 403,
    description: 'No autorizado para eliminar esta tarea.',
  })
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    const userId = req.user.id;
    this.logger.log(
      `Request de Usuario [${userId}] para eliminar tarea [${id}]`,
    );
    return this.tasksService.remove(id, userId);
  }
}
