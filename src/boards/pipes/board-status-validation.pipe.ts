import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../boards.model";

export class BoardStatusValidationPipe implements PipeTransform {
	readonly StatusOptions = [
		BoardStatus.PRIVATE,
		BoardStatus.PUBLIC
	]
	
	transform(value: any, metadata: ArgumentMetadata) {
		// status는 PRIVATE PUBLIC 만 올 수 있다
		// 이에 대한 커스텀 파이프
		value = value.toUpperCase();

		if (!this.isStatusValid(value)) {
			throw new BadRequestException(`${value} isn't in the status options`);
		}

		return value;
	}

	private isStatusValid(status: any) {
		// indexOf() : status값을 찾았을때 없으면 -1 리턴 있으면 인덱스 리턴
		const index = this.StatusOptions.indexOf(status);
		return index !== -1;
	}
}