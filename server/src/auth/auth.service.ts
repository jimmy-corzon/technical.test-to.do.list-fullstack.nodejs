import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { compare, encrypt } from 'src/libs/hashing';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: { email: string; password: string }) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new BadRequestException('Email o contraseña incorrecta');
      }
      const isPasswordMatch = await compare(password, user.password);
      if (!isPasswordMatch) {
        throw new BadRequestException('Email o contraseña incorrecta');
      }
      const { password: _, ...result } = user;
      const payload = { ...result };
      const accessToken = this.jwtService.sign(payload);
      return { user: result, token: accessToken };
    } catch (error) {
      console.log('Error: AuthService.login - ', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al iniciar sesión');
    }
  }

  async signUp(input: Prisma.UserCreateInput) {
    try {
      const hashedPassword = await encrypt(input.password);
      const newUser = await this.prismaService.user.create({
        data: {
          ...input,
          password: hashedPassword,
        },
      });
      const { password: _, ...result } = newUser;
      const payload = { ...result };
      const accessToken = this.jwtService.sign(payload);
      return { user: result, token: accessToken };
    } catch (error) {
      console.log('Error: AuthService.signUp - ', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al registrar el usuario');
    }
  }
}
