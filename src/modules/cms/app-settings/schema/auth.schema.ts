import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
@Schema({
  timestamps: true
})
export class AppSettings extends Document {
  @Prop({ type: String, default: '/default-logo.png' })
  image : File | string
}

export const AppSettingsSchema = SchemaFactory.createForClass(AppSettings);
