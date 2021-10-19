import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compare } from 'src/utils/bcrypt.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);

    if (user && (await compare(password, user.password))) {
      return { id: user.id, username: user.username, roles: user.roles };
    }

    return null;
  }

  async login(user: { id: string; username: string; roles: string[] }) {
    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles,
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
