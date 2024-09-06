'use client';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddRowDeleteButton from './addRowDelete';
const AddDateRow = ({
	startTime,
	endTime,
	removeDate,
	setStartTime,
	setEndTime,
}: {
	startTime: string | undefined;
	endTime: string | undefined;
	removeDate: () => void;
	setStartTime: (time: string) => void;
	setEndTime: (time: string) => void;
}) => {
	return (
		<div className="flex items-center justify-between gap-1">
			<CalendarMonthIcon
				fontSize="small"
				style={{ color: startTime && endTime ? 'black' : 'gray' }}
			/>
			<div className="flex grow gap-2 items-center text-xs  font-semibold">
				<input
					type="time"
					value={startTime ?? ''}
					onChange={(e) => {
						setStartTime(e.target.value);
					}}
					className="w-full border-gray-400 p-1 border-[1px] rounded-lg outline-gray-400"
				/>
				-
				<input
					type="time"
					value={endTime ?? ''}
					onChange={(e) => {
						setEndTime(e.target.value);
					}}
					className="w-full border-gray-400 p-1 border-[1px] rounded-lg outline-gray-400"
				/>
			</div>
			{startTime && endTime && (
				<AddRowDeleteButton
					onClick={() => {
						removeDate();
					}}
				/>
			)}
		</div>
	);
};
export default AddDateRow;
