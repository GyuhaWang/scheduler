'use client';

import { ChangeEvent, useMemo, useRef } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DragEvent } from 'react';
import TodoRow from './todoRow';
import TodoInput from './todoInput';
import AddDateRow from './addDateRow';
import AddMemoRow from './addMemoRow';
import { TodoModule } from '@/@types/todo';
const Todos = ({
	todos,
	inputValue,
	isOptionalInputNow,
	currentTodo,
	isInvalid,
	invalidMessage,
	setTodo,
	onChangeInput,
	addTodo,
	onClickCheck,
	useFilter,
	removeDate,
	removeMemo,
	removeTodo,
	updateTodo,
	setStartTime,
	setEndTime,
	onChangeMemoInput,
}: {
	todos: TodoModule[];
	inputValue: string;
	isOptionalInputNow: boolean;
	currentTodo: TodoModule | undefined;
	isInvalid: boolean;
	invalidMessage: string | undefined;
	setTodo: (todoList: TodoModule[]) => void;
	onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
	addTodo: () => void;
	onClickCheck: (todoId: string) => void;
	useFilter: (filter: 'doneFirst' | 'doneLast' | 'default') => void;
	removeDate: () => void;
	removeMemo: () => void;
	removeTodo: (id: string) => void;
	updateTodo: (todoId: string, text: string) => void;
	setStartTime: (time: string) => void;
	setEndTime: (time: string) => void;
	onChangeMemoInput: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
	const maxTodoLength = 10;
	const draggingItemIndex = useRef<number | null>(null);
	const draggingOverItemIndex = useRef<number | null>(null);

	const onDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
		// draggingItemIndex.current = index;
	};
	const onDragEnter = (e: DragEvent<HTMLDivElement>, index: number) => {
		// draggingOverItemIndex.current = index;
		// if (
		// 	draggingItemIndex.current === null ||
		// 	draggingOverItemIndex.current === null
		// )
		// 	return;
		// const newList = [...todos];
		// const dragItemValue = newList[draggingItemIndex.current];
		// newList.splice(draggingItemIndex.current, 1); // 제거
		// newList.splice(draggingOverItemIndex.current, 0, dragItemValue); //추가
		// draggingItemIndex.current = draggingOverItemIndex.current;
		// draggingOverItemIndex.current = null;
		// setTodo(newList);
	};
	const drop = (e: DragEvent<HTMLDivElement>) => {
		// if (
		// 	draggingItemIndex.current === null ||
		// 	draggingOverItemIndex.current === null
		// )
		// 	return;
		// const newList = [...todos];
		// const dragItemValue = newList[draggingItemIndex.current];
		// newList.splice(draggingItemIndex.current, 1); // 제거
		// newList.splice(draggingOverItemIndex.current, 0, dragItemValue); //추가
		// draggingItemIndex.current = null;
		// draggingOverItemIndex.current = null;
		// setTodo(newList);
	};
	const onDragOver = (e: DragEvent<HTMLDivElement>) => {
		// e.preventDefault();
	};
	const dateRow = useMemo(() => {
		const startTime = currentTodo?.date?.getStartTime();
		const endTime = currentTodo?.date?.getEndTime();

		return (
			<AddDateRow
				startTime={startTime}
				endTime={endTime}
				removeDate={removeDate}
				setStartTime={setStartTime}
				setEndTime={setEndTime}
			/>
		);
	}, [currentTodo]);
	const memoRow = useMemo(() => {
		return (
			<AddMemoRow
				memo={currentTodo?.content}
				onChangeMemoInput={onChangeMemoInput}
				removeMemo={removeMemo}
			/>
		);
	}, [currentTodo]);
	const invalidRow = useMemo(() => {
		return (
			isInvalid && <p className="text-xs px-4 text-red-500">{invalidMessage}</p>
		);
	}, [isInvalid, invalidMessage]);
	return (
		<section className="flex flex-col gap-6">
			<div className="w-full flex flex-col gap-3">
				{/* <div>
					<button onClick={() => useFilter('doneLast')}>
						필터 버튼입니다.
					</button>
				</div> */}
				<form
					className="flex items-center justify-start gap-4 border-[1px] border-gray-300  rounded-full px-2 "
					onSubmit={(event) => {
						event.preventDefault();
						const data = new FormData(event.currentTarget);
						addTodo();
					}}>
					<TodoInput
						onChange={onChangeInput}
						inputValue={inputValue}
					/>

					<label>
						<input
							hidden
							className="text-xs font-bold"
							type="submit"
						/>
						<AddCircleOutlineIcon
							fontSize="medium"
							className="text-green-500 z-10 hover:scale-95 active:90 transition-all"
						/>
					</label>
				</form>
				{dateRow}
				{memoRow}
				{invalidRow}

				{isOptionalInputNow && (
					<div className="text-xs px-4 text-gray-500">
						@t 는 시간을, @m은 memo를 추가 가능
					</div>
				)}
			</div>
			<div className="flex flex-col gap-2 h-full w-full">
				{todos.map((option, idx) => {
					return (
						<div key={option.id}>
							<TodoRow
								index={idx}
								item={option}
								onDragStart={onDragStart}
								onDragEnd={drop}
								onDragEnter={onDragEnter}
								onDragOver={onDragOver}
								onClickCheckBox={onClickCheck}
								onClickUpdate={updateTodo}
								onClickremove={removeTodo}
							/>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default Todos;
