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

  async validateUser(homeId: string, password: string) {
    const user = await this.usersService.findOne(homeId);

    if (user && (await compare(password, user.password))) {
      return { id: user.id, homeId: user.homeId, roles: user.roles };
    }
    return null;
  }

  async login(user: { id: string; homeId: string; roles: string[] }) {
    const payload = { sub: user.id, homeId: user.homeId, roles: user.roles };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
