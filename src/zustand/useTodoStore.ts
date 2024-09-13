import { Todo } from '@/@types/todo';
import { create } from 'zustand';

interface TodoStore {
	todos: Todo[];
	addTodo: (todo: Todo) => void;
	toggleTodo: (id: number) => void;
	removeTodo: (id: number) => void;
	setInitialTodos: (todos: Todo[]) => void; // 초기화 함수 추가
}

// 초기 상태를 관리할 수 있도록 setInitialTodos 함수를 추가
const useTodoStore = create<TodoStore>((set) => ({
	todos: [],
	addTodo: (todo) =>
		set((state) => ({
			todos: [...state.todos, todo],
		})),
	toggleTodo: (id) =>
		set((state) => ({
			todos: state.todos.map((todo) =>
				todo.id == id ? { ...todo, isdone: !todo.isdone } : todo
			),
		})),
	removeTodo: (id) =>
		set((state) => ({
			todos: state.todos.filter((todo) => todo.id !== id),
		})),
	setInitialTodos: (todos: Todo[]) =>
		set(() => ({
			todos,
		})), // 초기값을 설정하는 함수
}));

export default useTodoStore;
