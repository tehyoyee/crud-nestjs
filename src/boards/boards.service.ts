import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './boards.repository';
import { Board } from './boards.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
	constructor(private boardRepository: BoardRepository) {}


    getBoardById(id: number): Promise<Board> {
        return this.boardRepository.getBoardById(id);
    }

	createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
		return this.boardRepository.createBoard(createBoardDto);
	}	

	async deleteBoard(id: number): Promise<void> {
		const result = await this.boardRepository.delete(id);

		console.log('result', result);
	}

	async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
		const board = await this.getBoardById(id);

		board.status = status;
		await this.boardRepository.save(board);

		return board;
	}

	async getAllBoards(): Promise<Board[]> {
		return this.boardRepository.find();
	}
// 	deleteBoard(id: string): void {
// 		const found = this.getBoardById(id);
// 		this.boards = this.boards.filter((board) => board.id !== id);  
// 	}

// 	updateBoardStatus(id: string, status: BoardStatus): Board {
// 		const board = this.getBoardById(id);
// 		board.status = status;
// 		return board;
// 	}
}	