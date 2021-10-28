import { HttpStatus, Injectable, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { Repository } from "typeorm";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { ApiResponse } from "src/interfaces/response.interface";
import { User } from "src/user/user.entity";

@Injectable()
export class AuthService {
  constructor(
		@InjectRepository(User) private readonly repository: Repository<User>,
		private jwtService: JwtService
	) {}

	async register(authRegisterDto: AuthRegisterDto): Promise<ApiResponse> {
		const user =  this.repository.create(authRegisterDto);
		const data = await this.repository.save(user);

		return {
			statusCode: HttpStatus.CREATED,
			message: 'register success',
			data
		}
	}

	async getUser(authLoginDto: AuthLoginDto): Promise<User | any> {
		const user = await this.repository.findOne({ username: authLoginDto.username });

		if (user && await bcrypt.compare(authLoginDto.password, user.password)) {
			return user;
		}

		return null;
	}

	async login(
		user: User,
		@Res({ passthrough: true }) res: Response
	) {
		const payload = { username: user.username, id: user.id };
		const jwt =  {
			access_token: await this.jwtService.signAsync(payload)
		};
		res.cookie('jwt', jwt, { httpOnly: true });

		return {
			statusCode: HttpStatus.OK,
			message: 'login success'
		}
	}
}