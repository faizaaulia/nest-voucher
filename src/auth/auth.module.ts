import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { User } from "src/user/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
		TypeOrmModule.forFeature([User]),
		JwtModule.register({
			secret: 'secret',	// SHOULD BE STORE IN SOMEWHERE LIKE .ENV
			signOptions: { expiresIn: 3600 }
		})
	],
	controllers: [AuthController],
	providers: [AuthService]
})

export class AuthModule {}