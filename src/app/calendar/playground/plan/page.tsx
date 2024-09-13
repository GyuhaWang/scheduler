import PlannerIndex from '@/component/plan';
import { Suspense } from 'react';

const Plan = () => {
	return (
		<div className="p-10">
			<Suspense>
				<PlannerIndex />
			</Suspense>
		</div>
	);
};

export default Plan;
