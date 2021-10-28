import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
	ADMIN = 'admin',
	CUSTOMER = 'customer'
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
	id: number

	@Column({ name: 'name', type: 'varchar' })
	name: string

	@Column({ name: 'username', type: 'varchar' })
	username: string

	@Column({ name: 'password', type: 'varchar' })
	password: string

	@Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
	role: UserRole
}
