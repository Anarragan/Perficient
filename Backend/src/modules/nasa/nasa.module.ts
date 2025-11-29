import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NasaService } from './nasa.service';
import { NasaController } from './nasa.controller';

@Module({
  imports: [HttpModule],
  controllers: [NasaController],
  providers: [NasaService],
  exports: [NasaService],
})
export class NasaModule {}