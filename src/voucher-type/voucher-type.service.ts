import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVoucherTypeDto } from './dto/create-voucher-type.dto';
import { UpdateVoucherTypeDto } from './dto/update-voucher-type.dto';
import { VoucherType } from './entities/voucher-type.entity';

@Injectable()
export class VoucherTypeService {
  constructor(@InjectRepository(VoucherType) private readonly repository: Repository<VoucherType>) {};

  create(createVoucherTypeDto: CreateVoucherTypeDto): Promise<VoucherType> {
    const voucherType = this.repository.create(createVoucherTypeDto);
    return this.repository.save(voucherType);
  }

  findAll(): Promise<VoucherType[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<VoucherType> {
    try {
      return this.repository.findOneOrFail(id)
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateVoucherTypeDto: UpdateVoucherTypeDto): Promise<VoucherType> {
    const voucherType = await this.repository.preload({
      id: id,
      ...updateVoucherTypeDto
    });
    
    if (!voucherType) {
      throw new NotFoundException(`Voucher type ${id} not found`);
    }

    return this.repository.save(voucherType);
  }

  async remove(id: number) {
    const voucherType = await this.repository.findOne(id);
    return this.repository.remove(voucherType);
  }
}
