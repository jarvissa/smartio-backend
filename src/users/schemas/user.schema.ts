import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  homeId: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  roles: string[];
}
export const UserSchema = SchemaFactory.createForClass(User);
