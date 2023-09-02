import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
	private boards: Board[] = [];

	getAllBoards(): Board[] {
		return this.boards;
	}

	createBoard(createBoradDto: CreateBoardDto) {
		const { title, description } = createBoradDto;

		const board: Board = {
			id: uuid(),
			title,
			description,
			status: BoardStatus.PUBLIC,
		}

		this.boards.push(board);
		return board;
	}

	getBoardById(id: string): Board {
		const found = this.boards.find((board) => board.id === id);
		if (!found) {	// 없는 게시물 찾을 때 에러
			throw new NotFoundException(`Can't find Board with id ${id}`);
		}
		return found;
	}

	deleteBoard(id: string): void {
		const found = this.getBoardById(id);
		this.boards = this.boards.filter((board) => board.id !== id);  
	}

	updateBoardStatus(id: string, status: BoardStatus): Board {
		const board = this.getBoardById(id);
		board.status = status;
		return board;
	}
}
