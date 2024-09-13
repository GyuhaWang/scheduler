import { getTodo } from '@/actions/todoActions';

import { SsrTag } from './rendering_tag';
import { TodoRow } from './todo_row_ssr';

export default async function Read() {
	const data = await getTodo();

	return (
		<section className="border-black border-2 m-2">
			<SsrTag />
			{data.map((d) => (
				<TodoRow
					key={d.id}
					data={d}
				/>
			))}
		</section>
	);
}
