import { VoucherType } from "src/voucher-type/entities/voucher-type.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Voucher extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
	id: number

	@Column({ name: 'name', type: 'varchar' })
	name: string

	@Column({ name: 'price', type: 'int' })
	price: number

	@Column({ name: 'qty', type: 'int' })
	qty: number

  @ManyToOne(type => VoucherType, voucherType => voucherType.vouchers)
	voucherType: VoucherType;
}
