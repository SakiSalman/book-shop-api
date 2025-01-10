import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class BookCategories extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  slug: string;

  @Prop({ type: String, default: null })
  description: string | null;

  @Prop({ type: String, default: '/default-category-icon.png' })
  icon: File | string | null;
  
  @Prop({ type: Types.ObjectId, ref: 'BookCategory', default: null })
  parentCategory: Types.ObjectId | null;
}

export const BookCategoriesSchema = SchemaFactory.createForClass(BookCategories);
