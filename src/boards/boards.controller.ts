import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller("boards")
export class BoardsController {
	constructor(private boardsService: BoardsService) {}

	@Get("/")
	getAllBoard(): Board[] {
		return this.boardsService.getAllBoards();
	}

	@Post()
	@UsePipes(ValidationPipe)	// 핸들러 레벨 파이프
	createBoard(
		@Body() createBoradDto: CreateBoardDto,
	): Board {
		return this.boardsService.createBoard(createBoradDto);
	}

	@Get('/:id')
	getBoardById(@Param('id') id: string) {
		return this.boardsService.getBoardById(id);
	}

	@Delete('/:id')
	deleteBoard(@Param('id') id: string): void {
		this.boardsService.deleteBoard(id);
	}

	@Patch('/:id/status')
	updateBoardStatus(
		@Param('id') id: string,
		@Body('status', BoardStatusValidationPipe) status: BoardStatus,
	) {
		return this.boardsService.updateBoardStatus(id, status);
	}
}
