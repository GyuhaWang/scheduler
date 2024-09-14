import { Todo, TodoModule, TodoTime } from '@/@types/todo';
import { getTodo } from '@/actions/todoActions';
import { isSameDay } from '@/utils/data_util';
import Planner from './plan/planner';
import { SsrTag } from './rendering_tag';

const Plan = async () => {
	const todos = await getTodo();

	return (
		<div className="h-full w-full grow flex flex-col border-black border-2">
			<SsrTag />
			<div className="flex p-2">
				<Planner todos={todos} />
			</div>
		</div>
	);
};

export default Plan;
