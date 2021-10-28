import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/interfaces/response.interface';
import { Repository } from 'typeorm';
import { CreateVoucherTypeDto } from './dto/create-voucher-type.dto';
import { UpdateVoucherTypeDto } from './dto/update-voucher-type.dto';
import { VoucherType } from './entities/voucher-type.entity';

@Injectable()
export class VoucherTypeService {
  constructor(@InjectRepository(VoucherType) private readonly repository: Repository<VoucherType>) {};

  async create(createVoucherTypeDto: CreateVoucherTypeDto): Promise<ApiResponse> {
    const voucherType = this.repository.create(createVoucherTypeDto);
    const data = await this.repository.save(voucherType);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'success store data',
      data
    }
  }

  async findAll(): Promise<ApiResponse> {
    const data = await this.repository.find();

    return {
      statusCode: HttpStatus.OK,
      message: 'success get data',
      data
    }
  }

  async findOne(id: number): Promise<ApiResponse> {
    const data = await this.repository.findOne(id)

    if (!data) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Voucher type ${id} not found`
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'success get detail data',
      data
    }
  }

  async update(id: number, updateVoucherTypeDto: UpdateVoucherTypeDto): Promise<ApiResponse> {
    const voucherType = await this.repository.preload({
      id: id,
      ...updateVoucherTypeDto
    });
    
    if (!voucherType) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Voucher type ${id} not found`
      };
    }

    const data = await this.repository.save(voucherType);
    return {
      statusCode: HttpStatus.OK,
      message: 'success update data',
      data
    }
  }

  async remove(id: number) {
    const voucherType = await this.repository.findOne(id);

    if (!voucherType) {
      throw new NotFoundException(`Voucher type ${id} not found`);
    }

    this.repository.remove(voucherType);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'success delete data',
    }
  }
}
