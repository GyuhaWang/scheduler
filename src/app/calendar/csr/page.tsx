import { getTodo } from '@/actions/todoActions';
import Create from '@/component/create_csr';
import Read from '@/component/read_csr';

import { SsrTag } from '@/component/rendering_tag';
export default async function Page() {
	const initialData = await getTodo();

	return (
		<main className="border-black border-2 w-full h-full">
			<SsrTag />
			<div className="flex flex-col sm:flex-row">
				<div className="flex flex-col gap-6">
					<Create />
					<Read initialData={initialData} />
				</div>
				<div>planner 들어갈 자리</div>
			</div>
		</main>
	);
}
