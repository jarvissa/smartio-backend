import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/auth/role.enum';
import { User, UserDocument } from './schemas/user.schema';
import { hash } from 'src/utils/bcrypt.util';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const password = await hash(createUserDto.password);

    const createdUser = new this.userModel({
      username: createUserDto.username,
      password,
      roles: [Role.User],
    });

    return createdUser.save();
  }

  async findOne(username: string) {
    return this.userModel.findOne({ username }).exec();
  }
}
