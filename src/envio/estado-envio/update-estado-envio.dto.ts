import { IsEnum } from 'class-validator';
import { EstadoEnvio } from '../estado-envio/estado-envio.enum';

export class UpdateEstadoEnvioDto {
  @IsEnum(EstadoEnvio)
  estado_envio: EstadoEnvio;
}
