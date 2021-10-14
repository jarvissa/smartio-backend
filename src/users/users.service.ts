import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/auth/role.enum';
import { hash } from 'src/utils/bcrypt.util';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const password = await hash(createUserDto.password);

    const createdUser = new this.userModel({
      homeId: createUserDto.homeId,
      password,
      roles: [Role.User],
    });

    return createdUser.save();
  }

  async findOne(homeId: string) {
    return this.userModel.findOne({ homeId }).exec();
  }
}
