'use client';

import { Todo } from '@/@types/todo';
import { useMemo, useRef, useState } from 'react';
import { DragEvent } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';
const TodoRow = ({
	item,
	onDragStart,
	onDragEnter,
	onDragOver,
	onDragEnd,
	index,
	onClickCheckBox,
	onClickUpdate,
	onClickremove,
}: {
	item: Todo;
	onDragStart: (e: DragEvent<HTMLDivElement>, index: number) => void;
	onDragEnter: (e: DragEvent<HTMLDivElement>, index: number) => void;
	onDragOver: (e: DragEvent<HTMLDivElement>) => void;
	onDragEnd: (e: DragEvent<HTMLDivElement>) => void;
	index: number;
	onClickCheckBox: (id: string) => void;
	onClickUpdate: (id: string, content: string) => void;
	onClickremove: (id: string) => void;
}) => {
	const [editable, setEditable] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const inteoutRef = useRef<NodeJS.Timeout | null>(null);
	const TodoDiv = useMemo(() => {
		return !editable ? (
			<div className="flex grow justify-between  items-start ">
				<div
					className="flex break-all break-words font-xs 
				 ">
					{item.title}
				</div>
				<div className="flex   items-center gap-2">
					<button
						className="text-xs  font-bold text-nowrap"
						onClick={() => setEditable(true)}>
						<EditIcon
							fontSize="small"
							className="text-gray-500"
						/>
					</button>
					<button
						className="text-xs  font-bold text-nowrap"
						onClick={() => onClickremove(item.id)}>
						<DeleteOutlineIcon
							fontSize="small"
							className="text-red-500"
						/>
					</button>
				</div>
			</div>
		) : (
			<div className="flex grow justify-between items-center">
				<input
					className="flex w-full outline-none"
					autoFocus
					ref={inputRef}
					defaultValue={item.title}
				/>
				<button
					className="text-xs font-bold text-nowrap"
					onClick={(e) => {
						handleClickUpdate();
					}}>
					<SaveIcon
						fontSize="small"
						className="text-green-500"
					/>
				</button>
			</div>
		);
	}, [editable]);
	const handleClickUpdate = () => {
		onClickUpdate(item.id, inputRef.current?.value ?? item.title);
		setEditable(false);
	};
	const onMouseDown = () => {
		// 타이머 시작
		inteoutRef.current = setTimeout(() => {
			setEditable(true);
		}, 500);
	};
	const onMouseUp = () => {
		//타이머 종료
		if (inteoutRef.current) {
			clearTimeout(inteoutRef.current);
		}
	};

	return (
		<div
			className={`flex  p-[1px]  rounded-xl  bg-gradient-to-r ${
				item.isDone
					? 'from-teal-400 to-blue-200'
					: 'from-pink-500 to-orange-200'
			} `}>
			<div className="flex h-full w-full  bg-white rounded-xl">
				<label
					className={`w-10 p-2  rounded-s-xl text-center items-center justify-center ${
						item.isDone ? 'bg-green-500' : 'bg-red-500'
					} text-nowrap text-white text-xs `}>
					<div className="flex items-center text-center justify-center hover:scale-90 active:scale-85 transition-all">
						{item.isDone ? '완료' : '진행중'}
					</div>

					<input
						hidden
						className="h-full w-full"
						checked={item.isDone}
						onChange={(e) => {
							onClickCheckBox(item.id);
						}}
						type="checkbox"
					/>
				</label>

				<div
					onMouseDown={(e) => onMouseDown()}
					onMouseUp={(e) => onMouseUp()}
					className="p-2 w-full flex  justify-between text-black text-sm active:scale-[0.99] transition-all"
					onDragStart={(e) => onDragStart(e, index)}
					onDragEnter={(e) => onDragEnter(e, index)}
					onDragOver={onDragOver}
					onDragEnd={onDragEnd}
					draggable>
					{TodoDiv}
				</div>
			</div>
		</div>
	);
};

export default TodoRow;
