import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VoucherType extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
	id: number

	@Column({ name: 'type', type: 'varchar' })
	type: string
}
