export interface Todo {
	id: string;
	title: string;
	content: string | null;
	date: TodoTime | null;
	colorIndex: number;
	isDone: boolean;
}

export class TodoTime {
	startTime: Date;
	endTime: Date;

	constructor(startTime: Date, endTime: Date) {
		this.startTime = startTime;
		this.endTime = endTime;
	}

	isValid(): boolean {
		return this.startTime < this.endTime;
	}
	getStartHour(): number {
		return this.startTime.getHours();
	}
	getStartMinute(): number {
		return this.startTime.getMinutes();
	}
	getEndtHour(): number {
		return this.endTime.getHours();
	}
	getEndMinute(): number {
		return this.endTime.getMinutes();
	}
	getStartTime(): string {
		const hours = this.getStartHour().toString().padStart(2, '0');
		const minutes = this.getStartMinute().toString().padStart(2, '0');

		return `${hours}:${minutes}`;
	}
	getEndTime(): string {
		const hours = this.getEndtHour().toString().padStart(2, '0');
		const minutes = this.getEndMinute().toString().padStart(2, '0');

		return `${hours}:${minutes}`;
	}
	getPlanStartTime(): number {
		const hours = this.getStartHour();
		const minutes = this.getStartMinute() / 60;
		return hours + minutes;
	}
	getPlanHeight(): number {
		const hours = this.getEndtHour() - this.getStartHour();
		const minutes = this.getEndMinute() / 60 - this.getStartMinute() / 60;
		console.log(hours + minutes);
		return hours + minutes;
	}
	// getStartPosition
	// getHeight
}
