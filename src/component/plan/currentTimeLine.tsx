'use client';

import useCurrentTime from '@/customHooks/useCurrentTime';
import { useMemo } from 'react';
import Running from '../running/running';

const CurrentTime = () => {
	const currentTime = useCurrentTime();
	let currentMinute = currentTime.getMinutes();
	const calculatedIndex = useMemo(() => {
		const minute = currentMinute / 60;

		return currentTime.getHours() + minute;
	}, [currentMinute]);
	const timeLine = useMemo(() => {
		return (
			<div
				style={{
					top: `calc(var(--time-table-half-height) + (var(--time-table-height)*${calculatedIndex} ))`,
				}}
				className=" absolute h-[2px] left-[5%] w-[95%] bg-red-700  ">
				<Running />
			</div>
		);
	}, [calculatedIndex]);
	return <>{timeLine}</>;
};

export default CurrentTime;
