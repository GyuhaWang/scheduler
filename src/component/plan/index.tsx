'use client';

import { TodoModule } from '@/@types/todo';
import useTodo from '@/customHooks/useTodo';
import { red } from '@mui/material/colors';
import { useSession } from 'next-auth/react';
import Todos from '../todo/todoColumn';
import Planner from './planner';

import { useEffect } from 'react';
const PlannerIndex = async () => {
	const {
		todos,

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
				<Planner todos={todos} />
			</div>
		</div>
	);
};

export default PlannerIndex;
