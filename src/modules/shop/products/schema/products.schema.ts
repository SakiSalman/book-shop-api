import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({
  timestamps: true,
})
export class Products extends Document {
 
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
