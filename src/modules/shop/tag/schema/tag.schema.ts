import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class BookTag extends Document {
  @Prop({ type: String, required: true, unique:true })
  name: string;
  @Prop({ type: String, required: false, unique:true })
  slug: string;
}

export const BookTagSchema = SchemaFactory.createForClass(BookTag);
