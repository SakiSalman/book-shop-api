import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';  // Import Document from mongoose
import { UserRole } from "../user-role.enum";

@Schema({
  timestamps: true
})
export class Auth extends Document {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ enum: UserRole, default: UserRole.Customer })
  role: UserRole;

  @Prop({ type: [String], default: [] })
  books: string[];

  @Prop({ type: String, default: null })
  image : File | string
  @Prop({ type: Number, default: null })
  verifyCode : number

}

export const AuthSchema = SchemaFactory.createForClass(Auth);
