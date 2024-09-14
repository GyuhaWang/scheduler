'use client';
import { Todo } from '@/@types/todo';

import useTodoStore from '@/zustand/useTodoStore';

import { useEffect } from 'react';
import TodoRow from './todo_row_csr';

import { CsrTag, SsrTag } from './rendering_tag';

export default function Read({ initialData }: { initialData: Todo[] }) {
	const { todos, addTodo, removeTodo, toggleTodo, setInitialTodos } =
		useTodoStore();

	useEffect(() => {
		setInitialTodos(initialData);
	}, []);

	return (
		<section className="border-black border-2 m-2">
			<CsrTag />
			{todos.map((d, index) => (
				<TodoRow
					key={d.id}
					data={d}
				/>
			))}
		</section>
	);
}
