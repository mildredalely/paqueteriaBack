import { PartialType } from '@nestjs/mapped-types';
import { CreateRemitenteDto } from './create-remitente.dto';

export class UpdateRemitenteDto extends PartialType(CreateRemitenteDto) {}
