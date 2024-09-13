import Create from '@/component/create_ssr';
import Read from '@/component/read_ssr';
import { SsrTag } from '@/component/rendering_tag';
import { Suspense } from 'react';

export default async function Page() {
	return (
		<main className="border-black border-2 w-full h-full">
			<SsrTag />
			<div className="flex flex-col sm:flex-row">
				<div className="flex flex-col gap-6">
					<Suspense fallback={<div>loading</div>}>
						<Create />
						<Read />
					</Suspense>
				</div>
				<div>planner 들어갈 자리</div>
			</div>
		</main>
	);
}
