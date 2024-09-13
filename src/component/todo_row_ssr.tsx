import { Todo } from '@/@types/todo';
import { deleteTodo, updateTodo } from '@/actions/todoActions';
import { DeleteOutline } from '@mui/icons-material';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SsrTag } from './rendering_tag';

export async function TodoRow({ data }: { data: Todo }) {
	async function handleSumbitDelete(e: FormData) {
		'use server';
		if (data.id) {
			await deleteTodo(data.id);
			revalidatePath('/calendar/ssr');
			redirect('/calendar/ssr');
		}
	}
	async function habdleSubmitUpdate(e: FormData) {
		'use server';
		if (data.id) {
			console.log('clicked');
			await updateTodo({ ...data, isdone: !data.isdone });
			revalidatePath('/calendar/ssr');
			redirect('/calendar/ssr');
		}
	}
	return (
		<div
			key={data.id}
			className="border-b border-2">
			<SsrTag />
			<div className="border-black border-2 p-2 flex items-center justify-between gap-4">
				<form action={habdleSubmitUpdate}>
					<label className="flex items-center justify-center">
						<div
							className={`h-5 w-5 ${
								data.isdone
									? 'bg-blue-500 rounded-md'
									: 'bg-white border-black border-2 rounded-md'
							}`}></div>
						<input
							type="submit"
							hidden
						/>
					</label>
				</form>
				<div className="flex grow flex-col items-start ">
					<p className="text-xl font-bold">{data.title}</p>
					<p className="text-sm font-semibold">{data.content}</p>
				</div>
				<form action={handleSumbitDelete}>
					<label>
						<input
							hidden
							type="submit"
						/>
						<DeleteOutline />
					</label>
				</form>
			</div>
		</div>
	);
}
