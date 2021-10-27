import { Controller, Get, Param } from '@nestjs/common';
import { VoucherService } from './voucher.service';
  
@Controller('voucher')
export class VoucherController {
	constructor(private readonly voucherService: VoucherService) {}
  
  @Get(':id')
  findOne(@Param('id') id: string) {
  	return this.voucherService.findOne(+id);
  }
}
  