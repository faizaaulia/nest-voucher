import { HttpStatus } from "@nestjs/common";

export interface ApiResponse {
  statusCode: HttpStatus | number,
	message: string,
	data?: any
}