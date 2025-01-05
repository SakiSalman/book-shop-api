import { PartialType } from '@nestjs/mapped-types';
import { CreateHeaderFooterDto } from './create-header-footer.dto';

export class UpdateHeaderFooterDto extends PartialType(CreateHeaderFooterDto) {}
