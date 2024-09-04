'use client';
import EditNoteIcon from '@mui/icons-material/EditNote';

import AddRowDeleteButton from './addRowDelete';
const AddMemoRow = ({
	memo,
	removeMemo,
}: {
	memo: string;
	removeMemo: () => void;
}) => {
	return (
		<div className="flex items-start justify-start gap-1 px-4">
			<EditNoteIcon fontSize="small" />
			<div className="text-xs font-semibold">
				{memo}
				<AddRowDeleteButton onClick={removeMemo} />
			</div>
		</div>
	);
};
export default AddMemoRow;
