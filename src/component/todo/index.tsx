'use client';

import useTodo from '@/customHooks/useTodo';
import Todos from '../todo/todoColumn';
import { fetchTodosFromDB } from '../../app/calendar/action';
const TodoIndex = () => {
	const {
		todos,
		plans,
		inputValue,
		isOptionalInputNow,
		isInvalid,
		invalidMessage,
		currentTodo,
		onChangeInput,
		onClickCheck,
		updateTodo,
		setTodo,
		addTodo,
		useFilter,
		removeTodo,
		removeDate,
		removeMemo,
		setStartTime,
		setEndTime,
		onChangeMemoInput,
	} = useTodo(fetchTodosFromDB);
	return (
		<div className="flex flex-col sm:flex-row gap-4 ">
			<div className=" felx w-full flex-col ">
				<Todos
					todos={todos}
					inputValue={inputValue}
					isOptionalInputNow={isOptionalInputNow}
					currentTodo={currentTodo}
					isInvalid={isInvalid}
					invalidMessage={invalidMessage}
					setTodo={setTodo}
					onChangeInput={onChangeInput}
					addTodo={addTodo}
					onClickCheck={onClickCheck}
					useFilter={useFilter}
					removeDate={removeDate}
					removeMemo={removeMemo}
					removeTodo={removeTodo}
					updateTodo={updateTodo}
					setStartTime={setStartTime}
					setEndTime={setEndTime}
					onChangeMemoInput={onChangeMemoInput}
				/>
			</div>
		</div>
	);
};

export default TodoIndex;
