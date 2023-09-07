import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credetial.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private userRepository: UserRepository,
		private jwtService: JwtService
	) {}

	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		return this.userRepository.createUser(authCredentialsDto);
	}

	async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken }> {
		const { username, password } = authCredentialsDto;
 		const user = await this.userRepository.findOneBy({ username });

		if (user && (await bcrypt.compare(password, user.password))) {
			// 유저 토큰 생성 (Secret + Payload)
			const payload = { username };
			const accessToken = await this.jwtService.sign(payload);

			return { accessToken: accessToken };
		} else {
			throw new UnauthorizedException('login failed');
		}
	}
}

