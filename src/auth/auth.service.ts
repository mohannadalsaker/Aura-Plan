import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login({ email, password }: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
    if (!user) throw new NotFoundException('User not found');

    const matchedPasswords = await bcrypt.compare(password, user.password);
    if (!matchedPasswords) throw new BadRequestException('Invalid password');

    return this.signToken(user.id, user.email, user.role.name);
  }

  private signToken(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
