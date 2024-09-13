'use client';

import { Todo } from '@/@types/todo';
import { deleteTodo, updateTodo } from '@/actions/todoActions';
import useTodoStore from '@/zustand/useTodoStore';
import { DeleteOutline } from '@mui/icons-material';
import { CsrTag } from './rendering_tag';

export default function TodoRow({ data }: { data: Todo }) {
	const { todos, addTodo, removeTodo, toggleTodo, setInitialTodos } =
		useTodoStore();
	async function handleSumbitDelete() {
		if (data.id) {
			await deleteTodo(data.id)
				.then(() => removeTodo(data.id!))
				.catch((e) =>
					window.alert('요청이 너무 많습니다. 잠시후 다시 시도해주세요.')
				);
		}
	}
	async function handleToggleTodo() {
		if (data.id) {
			await updateTodo({ ...data, isdone: !data.isdone })
				.then(() => toggleTodo(data.id!))
				.catch((e) => {
					console.log(e);
					window.alert('요청이 너무 많습니다. 잠시후 다시 시도해주세요.');
				});
		}
	}
	return (
		<div
			key={data.id}
			className="border-b border-2">
			<CsrTag />
			<div className="border-black border-2 p-2 flex items-center justify-between gap-4">
				<input
					className="h-5 w-5"
					type="checkbox"
					checked={data.isdone}
					onChange={() => handleToggleTodo()}
				/>
				<div className="flex grow flex-col items-start ">
					<p className="text-xl font-bold">{data.title}</p>
					<p className="text-sm font-semibold">{data.content}</p>
				</div>
				<button onClick={handleSumbitDelete}>
					<DeleteOutline />
				</button>
			</div>
		</div>
	);
}
