import { plannerTime } from '@/@types/planner';
import { useState } from 'react';

const DateRow = ({ target }: { target: plannerTime }) => {
	const [isEditing, setIsEditing] = useState(false);

	const handelClickTime = () => {
		setIsEditing(!isEditing);
	};
	return (
		<div
			className="grow w-full h-time-table  flex items-center justify-start gap-2"
			key={target.key}>
			<div
				onClick={() => handelClickTime()}
				className="w-14  text-nowrap text-xs font-bold relative">
				{target.label}
				<div
					className={` absolute top-0${
						isEditing ? 'w-full h-40 visible z-10' : 'w-0 h-0 invisible -z-10'
					} transition-all bg-red-50`}>
					editing
					{target.label}
					<input autoFocus={true} />
				</div>
			</div>
			<div className="flex grow h-[1px] w-full bg-gray-200" />
		</div>
	);
};
export default DateRow;

{
	/* <div className="flex w-full relative ">
				<div
					className={` absolute top-0${
						isEditing ? 'w-full h-40 visible z-10' : 'w-0 h-0 invisible -z-10'
					} transition-all bg-red-50`}>
					editing
					{target.label}
					<input autoFocus={true} />
				</div>
			</div> */
}
