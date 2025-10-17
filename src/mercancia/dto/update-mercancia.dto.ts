import { PartialType } from '@nestjs/mapped-types';
import { CreateMercanciaDto } from './create-mercancia.dto';

export class UpdateMercanciaDto extends PartialType(CreateMercanciaDto) {}
