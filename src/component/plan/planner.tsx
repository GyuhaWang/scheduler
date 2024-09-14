'use client';

import { Todo, TodoModule, TodoTime } from '@/@types/todo';
import { PlannerTime } from '@/data/planner';
import { isSameDay } from '@/utils/data_util';
import { useMemo } from 'react';
import { CsrTag } from '../rendering_tag';
import CurrentTime from './currentTimeLine';

import DateRow from './dateRow';
import PlanBox from './planBox';

const Planner = ({ todos }: { todos: Todo[] }) => {
	const dateRow = useMemo(() => {
		return PlannerTime.map((val, index) => (
			<DateRow
				key={val.key}
				target={val}
			/>
		));
	}, []);
	const planCol = useMemo(() => {
		const li: TodoModule[] = [];
		todos.forEach((data) => {
			if (data.enddate != null && data.startdate != null) {
				const td = new Date();
				const sd = new Date(data.startdate);
				const ed = new Date(data.enddate);
				if (
					ed > sd &&
					isSameDay(sd, ed) &&
					isSameDay(sd, td) &&
					isSameDay(sd, td) &&
					data.id
				) {
					const newTodoTime: TodoTime = new TodoTime(sd, ed);
					const newModule: TodoModule = {
						id: data.id,
						title: data.title,
						content: data.content,
						date: newTodoTime,
						colorIndex: 0,
						isDone: data.isdone ?? false,
					};
					li.push(newModule);
				}
			}
		});
		return (
			<>
				{li.map((todo, index) => (
					<PlanBox
						plan={todo}
						key={todo.id}
					/>
				))}
			</>
		);
	}, [todos]);
	return (
		<div className="w-full h-full border-black border-2  p-2">
			<CsrTag />
			<div className="relative flex flex-col">
				<CurrentTime />
				{dateRow}
				{planCol}
			</div>
		</div>
	);
};

export default Planner;
