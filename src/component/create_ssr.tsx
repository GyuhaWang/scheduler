import { Todo } from '@/@types/todo';
import { createTodo } from '@/actions/todoActions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SsrTag } from './rendering_tag';

export default async function Create() {
	async function handelSubmitTodo(data: FormData) {
		'use server';
		try {
			const user_id = '792d073c-d7f4-44bf-b6c3-ea0ae8c462da';
			const title = data.get('title') as string;
			const content = data.get('content') as string;
			const startdate = data.get('startdate');
			const enddate = data.get('enddate');

			const todo: Todo = {
				user_id: user_id,
				title: title,
				content: content,
				startdate: startdate ? (startdate as string) : null,
				enddate: enddate ? (enddate as string) : null,
				colorIndex: null,
			};

			const res = await createTodo(todo);
		} catch (e) {
			console.log(e);
		}
		revalidatePath('/calendar/ssr');
		redirect('/calendar/ssr');
	}
	return (
		<section className="border-black border-2 m-2">
			<SsrTag />
			<div className="flex flex-col border-black border-2 rounded-3xl px-4 py-2 m-2 gap-2">
				<form
					className="flex flex-col gap-4"
					action={handelSubmitTodo}>
					<input
						className="outline-none border-b-2 border-black text-2xl"
						placeholder="제목"
						required
						name="title"
					/>
					<input
						className="outline-none border-b-2 border-black text-sm"
						placeholder="추가 정보"
						required
						name="content"
					/>
					<div className="border-black border-2 p-2">
						<label>
							<p className="font-thin text-xs">시작 시간</p>
							<input
								placeholder="start"
								type="datetime-local"
								name="startdate"
							/>
						</label>
						<label>
							<p className="font-thin text-xs">종료 시간</p>
							<input
								placeholder="end"
								type="datetime-local"
								name="enddate"
							/>
						</label>
					</div>
					<label className="flex items-center justify-center w-full p-2 bg-blue-500 rounded-3xl font-xl text-white font-bold">
						<p>추가</p>
						<input
							type="submit"
							hidden
						/>
					</label>
				</form>
			</div>
		</section>
	);
}
