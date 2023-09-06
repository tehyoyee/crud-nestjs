import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
    private logger = new Logger('BoardController');
    constructor(private boardsService: BoardsService) {}
// 	@Get("/")
// 	getAllBoard(): Board[] {
// 		return this.boardsService.getAllBoards();
// 	}

	@Post()
	@UsePipes(ValidationPipe)
	createBoard(@Body() createBoardDto: CreateBoardDto): Promise <Board> {
		return this.boardsService.createBoard(createBoardDto);
	}		 
	
// 	@Post()
// 	@UsePipes(ValidationPipe)	// 핸들러 레벨 파이프
// 	createBoard(
// 		@Body() createBoradDto: CreateBoardDto,
// 	): Board {
// 		return this.boardsService.createBoard(createBoradDto);
// 	}

	@Get('/:id')
	getBoardById(@Param('id') id: number): Promise <Board> {
		return this.boardsService.getBoardById(id);
	}
// 	@Get('/:id')
// 	getBoardById(@Param('id') id: string) {
// 		return this.boardsService.getBoardById(id);
// 	}

// 	@Delete('/:id')
// 	deleteBoard(@Param('id') id: string): void {
// 		this.boardsService.deleteBoard(id);
// 	}

// 	@Patch('/:id/status')
// 	updateBoardStatus(
// 		@Param('id') id: string,
// 		@Body('status', BoardStatusValidationPipe) status: BoardStatus,
// 	) {
// 		return this.boardsService.updateBoardStatus(id, status);
// 	}
}
