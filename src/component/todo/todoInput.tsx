import { ChangeEvent } from 'react';

const TodoInput = ({
	onChange,
	inputValue,
}: {
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	inputValue: string;
}) => {
	return (
		<input
			className="w-full outline-none rounded-full text-sm font-semibold pl-2 py-2 bg-transparent text-black placeholder-gray-500 text-wrap"
			placeholder="할 일을 입력해주세요"
			value={inputValue}
			onChange={onChange}
		/>
	);
};
export default TodoInput;
