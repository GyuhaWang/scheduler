import { Todo, TodoModule } from '@/@types/todo';

export const getTodo = async (): Promise<Todo[]> => {
	try {
		const res = await fetch(`http://localhost:3000/api/todos`, {
			method: 'GET',
			cache: 'no-cache',
		});
		const resJson = await res.json();
		if (resJson['success']) {
			return resJson['data'];
		} else {
			throw Error;
		}
	} catch (e) {
		throw Error;
	}
};

export const createTodo = async (data: Todo): Promise<Todo> => {
	try {
		const res = await fetch(`http://localhost:3000/api/todos`, {
			method: 'POST',
			body: JSON.stringify(data),
		});
		if (res.ok) {
			const Json = await res.json();

			return Json['data'];
		} else {
			throw Error;
		}
	} catch (e) {
		throw Error;
	}
};

export const deleteTodo = async (todoId: number) => {
	try {
		const res = await fetch(`http://localhost:3000/api/todos`, {
			method: 'DELETE',
			body: JSON.stringify({ id: todoId }),
		});
		if (res.ok) {
			console.log('deleted todo');
		} else {
			throw Error;
		}
	} catch (e) {
		throw Error;
	}
};
export const updateTodo = async (todo: Todo) => {
	try {
		const res = await fetch(`http://localhost:3000/api/todos`, {
			method: 'PUT',
			body: JSON.stringify(todo),
		});
		if (res.ok) {
			console.log('updated todo');
		} else {
			throw Error;
		}
	} catch (e) {
		throw Error;
	}
};
