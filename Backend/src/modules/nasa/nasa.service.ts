import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NasaService {
  private readonly logger = new Logger(NasaService.name);

  constructor(private readonly httpService: HttpService) {}

  async getMarsWeather() {
    const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
    const url = `https://api.nasa.gov/insight_weather/?api_key=${apiKey}&feedtype=json&ver=1.0`;

    try {
      const response = await firstValueFrom(this.httpService.get(url));
      const data = response.data;

      // Get the latest sol
      const latestSol = data.sol_keys[data.sol_keys.length - 1];
      const solData = data[latestSol];

      // Extract usable data
      const usableData = {
        sol: latestSol,
        temperature: {
          average: solData.AT.av,
          minimum: solData.AT.mn,
          maximum: solData.AT.mx,
        },
        pressure: {
          average: solData.PRE.av,
          minimum: solData.PRE.mn,
          maximum: solData.PRE.mx,
        },
        windSpeed: {
          average: solData.HWS.av,
          minimum: solData.HWS.mn,
          maximum: solData.HWS.mx,
        },
        windDirection: solData.WD.most_common.compass_point,
        season: solData.Season,
        northernSeason: solData.Northern_season,
        southernSeason: solData.Southern_season,
        firstUTC: solData.First_UTC,
        lastUTC: solData.Last_UTC,
      };

      return { success: true, data: usableData };
    } catch (error) {
      this.logger.error('Error fetching Mars weather data', error);
      if (error.response) {
        throw new HttpException(
          `NASA Weather API Error: ${error.response.status} - ${error.response.data?.error || error.response.statusText}`,
          error.response.status
        );
      } else {
        throw new HttpException('Network error or NASA Weather API unavailable', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async getRoverPhotos(rover: string) {
    // Use a date known to have photos
    const earthDate = '2025-11-06';
    const url = `https://rovers.nebulum.one/api/v1/rovers/${rover}/photos?earth_date=${earthDate}`;

    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return { success: true, data: response.data.photos };
    } catch (error) {
      this.logger.error(`Error fetching rover photos for ${rover}`, error);
      if (error.response) {
        const status = error.response.status;
        let message = `Nebulum Rover Photos API Error: ${status}`;

        if (status === 404) {
          message += ' - No photos found for this date or rover.';
        } else if (status === 429) {
          message += ' - Rate limit exceeded.';
        } else {
          message += ` - ${error.response.data?.error || error.response.statusText}`;
        }

        throw new HttpException(message, status);
      } else {
        throw new HttpException('Network error or Nebulum API unavailable', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}