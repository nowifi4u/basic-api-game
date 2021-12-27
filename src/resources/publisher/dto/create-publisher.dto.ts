import { IsNotEmpty, IsPhoneNumber, IsPositive } from 'class-validator';

export class CreatePublisherDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  @IsPositive()
  siret!: number;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone!: string;
}
