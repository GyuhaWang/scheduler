import { TodoModule } from '@/@types/todo';
import {
	planBorderColors,
	planColors,
	planTextColors,
} from '@/variables/color';
import { useCallback, useMemo } from 'react';

const PlanBox = ({ plan }: { plan: TodoModule }) => {
	const getRandomColor = useCallback(() => {
		return [
			`${planColors[plan.colorIndex]} ${planBorderColors[plan.colorIndex]}`,
			`${planTextColors[plan.colorIndex]}`,
		];
	}, []);
	const [bgColor, timeColor] = getRandomColor();

	const height = useMemo(() => plan.date?.getPlanHeight() ?? 0.5 - 0.05, []);
	const startTop = useMemo(() => plan.date?.getPlanStartTime(), []);
	return (
		<div
			style={{
				top: `calc(var(--time-table-half-height) + (var(--time-table-height)*${startTop} ))`,
				height: `calc(var(--time-table-height)*${height})`,
				width: 'calc(100% - var(--time-table-left))',
			}}
			className={`absolute p-1  align-middle text-left text-xs   border-l-4  rounded-xl left-16 ${bgColor}`}>
			<p>
				<span className={`text-xs font-semibold ${timeColor}`}>
					{plan.date?.getStartTime()}-{plan.date?.getEndTime()}:
				</span>
				<span className={`text-xs font-semibold `}> {plan.title}</span>
			</p>
			<div>{plan.content}</div>
		</div>
	);
};

export default PlanBox;
