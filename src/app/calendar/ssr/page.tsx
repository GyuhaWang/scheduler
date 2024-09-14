import Create from '@/component/create_ssr';
import Plan from '@/component/plan_ssr';

import Read from '@/component/read_ssr';
import { SsrTag } from '@/component/rendering_tag';
import { Suspense } from 'react';

const SSR = async () => {
	return (
		<main className="border-black border-2 w-full h-full">
			<SsrTag />
			<div className="w-full h-full  flex flex-col sm:flex-row">
				<div className="flex flex-col gap-6">
					<Suspense fallback={<div>loading</div>}>
						<Create />
						<Read />
					</Suspense>
				</div>
				<div className="w-full h-full">
					<Suspense fallback={<div>loading</div>}>
						<Plan />
					</Suspense>
				</div>
			</div>
		</main>
	);
};

export default SSR;
