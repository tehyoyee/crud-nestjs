import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
	constructor(private boardRepository: BoardRepository) {}


    getBoardById(id: number): Promise<Board> {
        return this.boardRepository.getBoardById(id);
    }
// 	getAllBoards(): Board[] {
// 		return this.boards;
// 	}

	createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
		return this.boardRepository.createBoard(createBoardDto);
	}	
// 	createBoard(createBoradDto: CreateBoardDto) {
// 		const { title, description } = createBoradDto;

// 		const board: Board = {
// 			id: uuid(),
// 			title,
// 			description,
// 			status: BoardStatus.PUBLIC,
// 		}

// 		this.boards.push(board);
// 		return board;
// 	}

// 	getBoardById(id: string): Board {
// 		const found = this.boards.find((board) => board.id === id);
// 		if (!found) {	// 없는 게시물 찾을 때 에러
// 			throw new NotFoundException(`Can't find Board with id ${id}`);
// 		}
// 		return found;
// 	}

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
