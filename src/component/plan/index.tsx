'use client';

import useTodo from '@/customHooks/useTodo';
import Todos from '../todo/todoColumn';
import Planner from './planner';

const PlannerIndex = () => {
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
	} = useTodo();
	return (
		<div className="flex flex-col sm:flex-row gap-4 ">
			<div className="flex min-w-[50%] grow h-full  ">
				<Planner todos={plans} />
			</div>
		</div>
	);
};

export default PlannerIndex;
