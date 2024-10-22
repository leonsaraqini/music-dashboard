import { IsString, IsArray } from 'class-validator';

export class UpdateMusicDto {
  @IsArray()
  title: string;

  @IsString()
  yearOfRelease: string;

  @IsArray()
  artists: string[];
}