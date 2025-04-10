import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto, LoginResponseDto } from 'src/auth/dto/login.dto';
import { SignUpDto, SignUpResponseDto } from 'src/auth/dto/sign-up.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * POST /auth/sign-up
   * Registra un nuevo usuario y devuelve un token JWT.
   */
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  @ApiOperation({
    summary: 'Registrar nuevo usuario',
    description: 'Crea un nuevo usuario y devuelve un token JWT.',
  })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({
    status: 201,
    description: 'Registro exitoso, devuelve token JWT.',
    type: SignUpResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Error en el registro.' })
  @ApiResponse({
    status: 409,
    description: 'El correo electrónico ya está en uso.',
  })
  signUp(@Body() input: SignUpDto) {
    return this.authService.signUp(input);
  }

  /**
   * POST /auth/login
   * Inicia sesión de usuario y devuelve un token JWT.
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Iniciar sesión de usuario',
    description: 'Valida las credenciales y devuelve un token JWT.',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso, devuelve token JWT.',
    type: LoginResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  login(@Body() input: LoginDto) {
    return this.authService.login(input);
  }
}
