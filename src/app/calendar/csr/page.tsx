import { getTodo } from '@/actions/todoActions';
import Create from '@/component/create_csr';
import Plan from '@/component/plan_csr';

import Read from '@/component/read_csr';
import { SsrTag } from '@/component/rendering_tag';

const CSR = async () => {
	const initialData = await getTodo();

	return (
		<main className="border-black border-2 w-full h-full">
			<SsrTag />
			<div className="w-full h-full  flex flex-col sm:flex-row">
				<div className="flex flex-col gap-6">
					<Create />
					<Read initialData={initialData} />
				</div>
				<div className="w-full h-full">
					<Plan />
				</div>
			</div>
		</main>
	);
};

export default CSR;
