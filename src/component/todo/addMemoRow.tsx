'use client';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { ChangeEvent, memo, useMemo } from 'react';

import AddRowDeleteButton from './addRowDelete';
const AddMemoRow = ({
	memo,
	onChangeMemoInput,
	removeMemo,
}: {
	memo: string | null | undefined;
	onChangeMemoInput: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	removeMemo: () => void;
}) => {
	const button = useMemo(() => {
		return memo ? <AddRowDeleteButton onClick={removeMemo} /> : null;
	}, [memo]);
	return (
		<div className="flex items-center justify-between gap-1 ">
			<EditNoteIcon
				fontSize="small"
				style={{ color: memo ? 'black' : 'gray' }}
			/>
			<div className="flex grow text-xs font-semibold">
				<textarea
					value={memo ?? ''}
					onChange={onChangeMemoInput}
					rows={1}
					className="h-full w-full outline-none border-b-[1px] border-gray-400 p-2"
				/>
			</div>
			{button}
		</div>
	);
};
export default AddMemoRow;
