import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PowerModule } from 'src/power/power.module';

@Module({
  providers: [CpuService],
  imports: [PowerModule], //define modulos a serem utilizados
  exports: [CpuService], // definie modulos a serem exportados para utilização
})
export class CpuModule { }
