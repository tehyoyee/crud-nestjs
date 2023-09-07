import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/boards-status-validation.pipe';
import { Board } from './boards.entity';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

	@Post()
	@UsePipes(ValidationPipe)
	createBoard(@Body() createBoardDto: CreateBoardDto): Promise <Board> {
		return this.boardsService.createBoard(createBoardDto);
	}		 

	@Get('/:id')
	getBoardById(@Param('id') id: number): Promise <Board> {
		return this.boardsService.getBoardById(id);
	}

	@Delete('/:id')
	deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.boardsService.deleteBoard(id);
	}

	@Patch('/:id/status')
	updateBoardStatus(
		@Param('id', ParseIntPipe) id: number,
		@Body('status', BoardStatusValidationPipe) status: BoardStatus
	): Promise<Board> {
		return this.boardsService.updateBoardStatus(id, status);
	}

	@Get()
	getAllBoards(): Promise<Board[]> {
		return this.boardsService.getAllBoards();
	}
}
