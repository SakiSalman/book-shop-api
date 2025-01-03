import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
@Schema({
  timestamps: true
})
export class AppSettings extends Document {
  @Prop({ type: String, default: '/default-logo.png', nullable: true })
  logo: File | string | null;
  
  @Prop({ type: String})
  primaryColor : string;
  
  @Prop({ type: String})
  secondaryColor : string;
  
  @Prop({ type: String})
  grayBg:string;
}

export const AppSettingsSchema = SchemaFactory.createForClass(AppSettings);