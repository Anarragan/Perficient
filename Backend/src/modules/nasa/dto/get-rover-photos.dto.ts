import { IsString, IsIn } from 'class-validator';

export class GetRoverPhotosDto {
  @IsString()
  @IsIn(['curiosity', 'perseverance'], {
    message: 'Rover must be one of: curiosity, perseverance',
  })
  rover: string;
}