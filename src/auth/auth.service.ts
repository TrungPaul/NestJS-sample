import { TaskRepository } from './../tasks/task.repository';
import { JwtPayload } from './jwt-payload.interface';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    @InjectRepository(TaskRepository)
    private userRepository: UserRepository,
    private taskRepository: TaskRepository,
    private jwtService: JwtService,
  ) {}

  async sigUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.sigUp(authCredentialDto);
  }

  async sigIn(authCredentialDto: AuthCredentialDto): Promise<any> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialDto,
    );

    const user = await this.userRepository.findOne({ username });

    if (!username) {
      throw new UnauthorizedException('Invalid');
    }
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken, user };
  }

  async validateUserPassword(
    authCredentialDto: AuthCredentialDto,
  ): Promise<string> {
    const { username, password } = authCredentialDto;

    const user = await this.userRepository.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }
}
