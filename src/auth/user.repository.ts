import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credetial.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

	async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		const { username, password } = authCredentialsDto;
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = this.create({ username, password: hashedPassword });
		await this.save(user);
	}
}