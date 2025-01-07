import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({
  timestamps: true,
})
export class HeaderFooterCMS extends Document {
  @Prop({ type: String, nullable : true , default:null })
  searchPlaceholder: string;

  @Prop({ type: String, nullable : true , default:null })
  searchButtonText: string;

  @Prop({ type: String, nullable : true , default:null })
  headerBgColor: string;

  @Prop({ type: String, nullable : true , default:null })
  footerBgColor: string;

  @Prop({ type: String, nullable : true , default:null })
  footerCopyrightColor: string;

  @Prop({ type: String, nullable : true , default:null })
  copyrightText: string;
}

export const HeaderFooterSchema = SchemaFactory.createForClass(HeaderFooterCMS);
