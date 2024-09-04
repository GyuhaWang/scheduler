'use client';

import { Todo } from '@/@types/todo';
import { PlannerTime } from '@/data/planner';
import { useMemo } from 'react';
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
		return (
			<>
				{todos.map((todo, index) => (
					<PlanBox
						plan={todo}
						key={todo.id}
					/>
				))}
			</>
		);
	}, [todos]);
	return (
		<div className="w-full h-full ">
			<div className="relative flex flex-col">
				<CurrentTime />
				{dateRow}
				{planCol}
			</div>
		</div>
	);
};

export default Planner;
