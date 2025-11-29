import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { NasaService } from './nasa.service';
import { GetRoverPhotosDto } from './dto/get-rover-photos.dto';
import { SkipApiKey } from '../../common/skip-api-key.decorator';
import { SkipJwt } from '../../common/skip-jwt.decorator';

@ApiTags('NASA')
@Controller('nasa')
@SkipApiKey()
@SkipJwt()
export class NasaController {
  constructor(private readonly nasaService: NasaService) {}

  @Get('mars-weather')
  @ApiOperation({ summary: 'Get Mars weather data' })
  @ApiResponse({ status: 200, description: 'Mars weather data retrieved successfully' })
  async getMarsWeather() {
    return this.nasaService.getMarsWeather();
  }

  @Get('rover-photos')
  @ApiOperation({ summary: 'Get latest photos from Mars rovers (Nebulum API)' })
  @ApiQuery({ name: 'rover', enum: ['curiosity', 'perseverance'] })
  @ApiResponse({ status: 200, description: 'Latest rover photos retrieved successfully' })
  async getRoverPhotos(@Query() query: GetRoverPhotosDto) {
    return this.nasaService.getRoverPhotos(query.rover);
  }
}