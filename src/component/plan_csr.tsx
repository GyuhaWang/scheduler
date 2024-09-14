'use client';
import { TodoModule, TodoTime } from '@/@types/todo';
import { isSameDay } from '@/utils/data_util';
import useTodoStore from '@/zustand/useTodoStore';
import { useMemo } from 'react';
import Planner from './plan/planner';
import { CsrTag, SsrTag } from './rendering_tag';

const Plan = () => {
	const { todos } = useTodoStore();

	return (
		<div className="h-full w-full grow flex flex-col border-black border-2">
			<CsrTag />
			<div className="flex p-2">
				<Planner todos={todos} />
			</div>
		</div>
	);
};

export default Plan;
