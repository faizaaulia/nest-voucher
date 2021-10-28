import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiResponse } from "src/interfaces/response.interface";
import { Repository } from "typeorm";
import { Voucher } from "./voucher.entity";

@Injectable()
export class VoucherService {
  constructor(@InjectRepository(Voucher) private readonly repository: Repository<Voucher>) {};

  async findAll(): Promise<ApiResponse> {
    const data = await this.repository.find()
    
    return {
      statusCode: HttpStatus.OK,
      message: 'success get data',
      data
    }
  }

	async findOne(id: number): Promise<ApiResponse> {
    const data = await this.repository.findOne(id, {
      relations: ['voucherType']
    });

    if (!data) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `voucher ${id} not found`
      }
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'success get detail data',
      data
    }
	}
}