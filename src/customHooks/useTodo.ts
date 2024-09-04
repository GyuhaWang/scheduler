import { Todo, TodoTime } from '@/@types/todo';
import { planColors } from '@/variables/color';
import { Preview } from '@mui/icons-material';
import {
	ChangeEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import uuid from 'react-uuid';

const useTodo = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const plans: Todo[] = useMemo(() => {
		return todos.filter(({ date }) => date != null);
	}, [todos]);
	const [inputValue, setInputValue] = useState('');
	const [currentTodo, setCurentTodo] = useState<Todo>();
	const [isOptionalInputNow, setIsOptionalInputNow] = useState(false);
	const [isInvalid, setIsInvalid] = useState(false);
	const [invalidMessage, setInvalidMessage] = useState<string>();
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	//
	const _addDate = (value: string) => {
		const date = value.match(/@t[^\/]*\//g);

		if (date) {
			const stringDate = date.map((match) => match.slice(2, -1)).toString();
			const splitTime = stringDate.split('-');
			const todayStartObj = new Date();
			const todayEndObj = new Date();
			if (splitTime.length == 2 || splitTime.length == 1) {
				//s,e 모두 존재
				const [sh, sm] = splitTime[0].split(':').map((st) => parseInt(st));
				const [eh, em] =
					splitTime.length == 2
						? splitTime[1].split(':').map((st) => parseInt(st))
						: [sh + 1, sm];
				todayStartObj.setHours(sh);
				todayStartObj.setMinutes(sm);
				todayEndObj.setHours(eh);
				todayEndObj.setMinutes(em);
				if (todayStartObj > todayEndObj) {
					_triggerInvalid('종료시간이 시작시간보다 빠릅니다!');
					return;
				}
				const newDate: TodoTime = new TodoTime(todayStartObj, todayEndObj);

				setCurentTodo((prev) => ({ ...prev!, ...{ date: newDate } }));
			}

			const dateText = value.replace(/@t[^\/]*\//g, '');
			setInputValue(dateText);
		}
	};
	const _addMemo = (value: string) => {
		const memo = value.match(/@m[^\/]*\//g);
		if (memo) {
			const stringMemo = memo.map((match) => match.slice(2, -1)).toString();
			setCurentTodo((prev) => ({ ...prev!, ...{ content: stringMemo } }));
			const memoText = value.replace(/@m[^\/]*\//g, '');
			setInputValue(memoText);
		}
	};
	const _triggerInvalid = useCallback((message: string) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		setIsInvalid(true);
		setInvalidMessage(message);
		timeoutRef.current = setTimeout(() => {
			setIsInvalid(false);
			setInvalidMessage(undefined);
		}, 1000);
	}, []);
	//
	useEffect(() => {
		if (currentTodo == undefined) {
			setCurentTodo({
				id: uuid(),
				title: inputValue,
				isDone: false,
				content: null,
				date: null,
				colorIndex: Math.floor(Math.random() * planColors.length),
			});
		} else {
			setCurentTodo((prev) => ({ ...prev!, ...{ title: inputValue } }));
		}
	}, [inputValue]);
	//
	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		setInputValue(value);
		handleAdditionalInput(value);
		if (currentTodo == undefined) {
			setCurentTodo({
				id: uuid(),
				title: value,
				isDone: false,
				content: null,
				date: null,
				colorIndex: Math.floor(Math.random() * planColors.length),
			});
		}
	};

	const handleAdditionalInput = (value: string) => {
		// @를 누르면 사용 가능합니다.
		// /를 누르면 사용이 마무리되고 저장됩니다.
		if (value.length > 0) {
			const char = value[value.length - 1];
			if (char == '@') {
				if (!isOptionalInputNow) {
					setIsOptionalInputNow(true);
				}
			} else if (char == '/') {
				_addMemo(value);
				_addDate(value);
				setIsOptionalInputNow(false);
			}
		} else {
			setIsOptionalInputNow(false);
		}
	};

	const removeDate = () => {
		setCurentTodo((prev) => ({ ...prev!, ...{ date: null } }));
	};
	const removeMemo = () => {
		setCurentTodo((prev) => ({ ...prev!, ...{ content: null } }));
	};
	const addTodo = () => {
		if (currentTodo == undefined) return;

		setTodos((prevTodos) => [currentTodo, ...prevTodos]);
		setInputValue('');
		setCurentTodo(undefined);
	};

	const removeTodo = (id: string) => {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
	};
	const updateTodo = (todoId: string, text: string) => {
		let tmpIndex = -1;
		const tmp: Todo | undefined = todos.find(({ id }, index) => {
			if (id == todoId) {
				tmpIndex = index;
			}
			return id == todoId;
		});

		if (tmp) {
			tmp.title = text;
			const tmpArr = [...todos];
			tmpArr[tmpIndex] = tmp;
			setTodos(tmpArr);
		}
	};
	const setTodo = (todoList: Todo[]) => {
		setTodos(todoList);
	};

	const useFilter = (filter: 'doneFirst' | 'doneLast' | 'default') => {
		const tmp = [...todos];
		switch (filter) {
			case 'doneFirst':
				tmp.sort((a, b) => {
					const valA = a.isDone ? 1 : 0;
					const valB = b.isDone ? 1 : 0;
					return valB - valA;
				});
				break;
			case 'doneLast':
				tmp.sort((a, b) => {
					const valA = a.isDone ? 1 : 0;
					const valB = b.isDone ? 1 : 0;
					return valA - valB;
				});
				break;

			case 'default':
				break;
		}
		setTodos(tmp);
	};
	const onClickCheck = (todoId: string) => {
		let todoIndex = -1;
		const todo: Todo | undefined = todos.find(({ id }, index) => {
			if (id == todoId) {
				todoIndex = index;
			}
			return id == todoId;
		});

		if (todo) {
			const isDone: boolean = todo.isDone;

			if (isDone) {
				// 만약 완료 된 것이라면
				// 1.미완료로 바꾼다.
				// todo.isDone = false;
				// 2.리스트의 맨 앞으로 보낸다.
				const tmp = [...todos];
				// tmp.splice(todoIndex, 1);
				// tmp.unshift(todo);
				tmp[todoIndex].isDone = false;
				setTodo(tmp);
			} else {
				// 완료가 아니라면
				// 1. 완료로 바꾼다.
				// todo.isDone = true;
				// 2. 리스트의 맨 뒤로 보낸다.
				const tmp = [...todos];
				// tmp.splice(todoIndex, 1);
				// tmp.push(todo);
				tmp[todoIndex].isDone = true;
				setTodo(tmp);
			}
		} else {
			window.alert('당신은 해커인가요?');
		}
	};
	return {
		todos,
		plans,
		inputValue,
		isOptionalInputNow,
		isInvalid,
		invalidMessage,
		currentTodo,
		onChangeInput,
		onClickCheck,
		updateTodo,
		setTodo,
		addTodo,
		useFilter,
		removeTodo,
		removeDate,
		removeMemo,
	};
};

export default useTodo;
