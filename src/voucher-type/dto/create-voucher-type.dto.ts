import { IsNotEmpty, IsString } from "class-validator";

export class CreateVoucherTypeDto {
  @IsString()
	@IsNotEmpty()
	type: string;
}
