import { Voucher } from "src/voucher/voucher.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VoucherType extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
	id: number

	@Column({ name: 'type', type: 'varchar' })
	type: string

	@OneToMany(type => Voucher, voucher => voucher.voucherType)
	vouchers: Voucher[];
}
