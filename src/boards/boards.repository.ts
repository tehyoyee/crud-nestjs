import { Injectable, NotFoundException } from "@nestjs/common";
import { Board } from "./boards.entity";
import { DataSource, Repository } from "typeorm";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./boards-status.enum";

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }

	async createBoard(createBoardDto: CreateBoardDto): Promise <Board> {
		const { title, description } = createBoardDto;

		const board = this.create({
			title,
			description,
			status: BoardStatus.PUBLIC,
		})

		await this.save(board);
		return board;
	}	

	async getBoardById(id: number): Promise<Board> {
        const found = await this.findOne({
            where: { id: id }
        });

        if (!found)
            throw new NotFoundException(`Cannot find Board with id ${id}`);

        return found;
    }

// 	async updateBoardStatus(id: number, status: BoardStatus): Promise <Board> {
// 		const board = await this.getBoardById(id);

// 		board.status = status;
// 		await this.save(board);
// 	}	
// }
}