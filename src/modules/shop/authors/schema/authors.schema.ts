import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class BookShopAuthor extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  bio: string;

  @Prop({ type: String, default: '/default-author-photo.png' })
  photo: string;

  @Prop({ type: [String], default: [] })
  genres: string[];

  @Prop({ type: [Types.ObjectId], ref: 'Book', default: [] })
  books: Types.ObjectId[];

  @Prop({ type: String, required: false })
  website: string;

  @Prop({ type: String, required: false })
  email: string;

  @Prop({ type: [String], default: [] })
  socialLinks: string[];
}

export const BookShopAuthorSchema = SchemaFactory.createForClass(BookShopAuthor);
