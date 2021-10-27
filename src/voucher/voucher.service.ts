import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Voucher } from "./voucher.entity";

@Injectable()
export class VoucherService {
  constructor(@InjectRepository(Voucher) private readonly repository: Repository<Voucher>) {};

	findOne(id: number): Promise<Voucher> {
		try {
      return this.repository.findOneOrFail(id, {
				relations: ['voucherType']
			})
    } catch (error) {
      throw error;
    }
	}
}