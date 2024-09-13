'use client';

import { TodoModule } from '@/@types/todo';
import useTodo from '@/customHooks/useTodo';
import { red } from '@mui/material/colors';
import { useSession } from 'next-auth/react';
import Todos from '../todo/todoColumn';
import Planner from './planner';
import { fetchTodosFromDB } from '../../app/calendar/action';
import { useEffect } from 'react';
const PlannerIndex = async () => {
	// const {
	// 	todos,
	// 	plans,
	// 	inputValue,
	// 	isOptionalInputNow,
	// 	isInvalid,
	// 	invalidMessage,
	// 	currentTodo,
	// 	onChangeInput,
	// 	onClickCheck,
	// 	updateTodo,
	// 	setTodo,
	// 	addTodo,
	// 	useFilter,
	// 	removeTodo,
	// 	removeDate,
	// 	removeMemo,
	// 	setStartTime,
	// 	setEndTime,
	// 	onChangeMemoInput,
	// } = useTodo();
	const plans = await fetchTodosFromDB();
	return (
		<div className="flex flex-col sm:flex-row gap-4 ">
			<div className="flex min-w-[50%] grow h-full  ">
				<Planner todos={plans} />
			</div>
		</div>
	);
};

export default PlannerIndex;
