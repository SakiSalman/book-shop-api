import { PartialType } from '@nestjs/mapped-types';
import { CreateSiteFrontendDto } from './create-site-frontend.dto';

export class UpdateSiteFrontendDto extends PartialType(CreateSiteFrontendDto) {}
