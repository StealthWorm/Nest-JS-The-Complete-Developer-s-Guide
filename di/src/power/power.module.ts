import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  providers: [PowerService], //tudo dentro do providers é private por padrão, por isso declaramos no "exports"
  exports: [PowerService],
})
export class PowerModule { }
