'use client';
import { TodoTime } from '@/@types/todo';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import AddRowDeleteButton from './addRowDelete';
const AddDateRow = ({
	date,
	removeDate,
}: {
	date: TodoTime;
	removeDate: () => void;
}) => {
	return (
		<div className="flex items-center justify-start gap-1 px-4">
			<CalendarMonthIcon fontSize="small" />
			<div className="text-xs  font-semibold">
				{date.getStartTime()}-{date.getEndTime()}
				<AddRowDeleteButton onClick={removeDate} />
			</div>
		</div>
	);
};
export default AddDateRow;
