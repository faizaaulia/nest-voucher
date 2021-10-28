import { Body, Controller, Post, Res, UnprocessableEntityException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { AuthRegisterDto } from "src/auth/dto/auth-register.dto";
import { AuthService } from "./auth.service";
import { AuthLoginDto } from "./dto/auth-login.dto";

@Controller('auth')
export class AuthController {
	constructor( private readonly authService: AuthService ) {}

	@Post('register')
	async register(@Body() authRegisterDto: AuthRegisterDto) {
		authRegisterDto.password = await bcrypt.hash(authRegisterDto.password, 12);

		return this.authService.register(authRegisterDto);
	}

	@Post('login')
	async login(
		@Body() authLoginDto: AuthLoginDto,
		@Res({ passthrough: true }) res: Response
	) {
		const user = await this.authService.getUser(authLoginDto);

		if (!user) {
			throw new UnprocessableEntityException('Invalid credentials');
		}

		return this.authService.login(user, res);
	}
}