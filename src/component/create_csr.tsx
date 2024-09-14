'use client';
import { Todo } from '@/@types/todo';
import { createTodo } from '@/actions/todoActions';

import useTodoStore from '@/zustand/useTodoStore';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

import { CsrTag } from './rendering_tag';
const initialTodo: Todo = {
	user_id: '792d073c-d7f4-44bf-b6c3-ea0ae8c462da',
	title: '',
	content: '',
	startdate: null,
	enddate: null,
	colorIndex: null,
};
export default function Create() {
	const { addTodo } = useTodoStore();
	const router = useRouter();
	const [todo, setTodo] = useState<Todo>(initialTodo);
	const { title, content, startdate, enddate } = todo;
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const nextInputs = {
			...todo,
			[name]: value,
		};

		setTodo(nextInputs);
	};
	async function handelSubmitTodo() {
		try {
			await createTodo(todo)
				.then((value) => {
					addTodo(value);
					router.replace('/calendar/csr');
				})
				.catch((e) =>
					window.alert('요청이 너무 많습니다. 잠시후 다시 시도해주세요.')
				);
		} catch (e) {
			console.log(e);
		}
	}
	return (
		<section className="border-black border-2 m-2">
			<CsrTag />
			<div className="flex flex-col border-black border-2 rounded-3xl px-4 py-2 m-2 gap-2">
				<form className="flex flex-col gap-4">
					<input
						className="outline-none border-b-2 border-black text-2xl"
						placeholder="제목"
						required
						name="title"
						value={title}
						onChange={onChange}
					/>

					<input
						className="outline-none border-b-2 border-black text-sm"
						placeholder="추가 정보"
						required
						name="content"
						value={content}
						onChange={onChange}
					/>
					<div className="border-black border-2 p-2">
						<label>
							<p className="font-thin text-xs">시작 시간</p>
							<input
								placeholder="start"
								type="datetime-local"
								name="startdate"
								value={startdate ?? ''}
								onChange={onChange}
							/>
						</label>
						<label>
							<p className="font-thin text-xs">종료 시간</p>
							<input
								placeholder="end"
								type="datetime-local"
								name="enddate"
								value={enddate ?? ''}
								onChange={onChange}
							/>
						</label>
					</div>
				</form>
				<button
					className="w-full p-2 bg-blue-500 rounded-3xl font-xl text-white font-bold"
					onClick={() => handelSubmitTodo()}>
					추가
				</button>
			</div>
		</section>
	);
}
