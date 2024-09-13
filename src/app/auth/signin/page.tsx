// 'use client';
// import { signIn } from 'next-auth/react';
// export default function Home() {
// 	const onSubmit = async (data: FormData) => {
// 		try {
// 			await fetch('http://localhost:3000/api/user', {
// 				method: 'POST',
// 				body: JSON.stringify({
// 					uid: data.get('uid') ?? '',
// 					password: data.get('password') ?? '',
// 					name: data.get('name') ?? '',
// 				}),
// 			}).then(async (res) => {
// 				const response = await res.json();
// 				if (response['success']) {
// 					await signIn('credentials', {
// 						uid: data.get('uid'),
// 						password: data.get('password'),
// 						redirect: true,
// 						callbackUrl: '/',
// 					});
// 				} else {
// 					window.alert(response['message']);
// 				}
// 			});
// 		} catch (e) {
// 			console.log(e);
// 		}
// 	};
// 	return (
// 		<div className="w-full h-full justify-center flex flex-col gap-4">
// 			<p className="text-3xl text-center">회원가입</p>
// 			<form
// 				className="flex flex-col gap-4"
// 				id="signin-form"
// 				action={onSubmit}>
// 				<input
// 					className="p-2 border-black border-2 outline-none "
// 					id="signin-name"
// 					name="name"
// 					placeholder="닉네임을 입력해주세요"
// 				/>
// 				<input
// 					className="p-2 border-black border-2 outline-none "
// 					id="signin-uid"
// 					name="uid"
// 					placeholder="아이디를 입력해주세요"
// 				/>

// 				<input
// 					className="p-2 border-black border-2 outline-none  "
// 					id="signin-password"
// 					name="password"
// 					type="password"
// 					placeholder="비밀번호를 입력해주세요"
// 				/>

// 				<label className="p-2 items-center justify-center text-center border-black border-2 rounded-3xl hover:scale-95 hover:bg-gray-100 transition-all active:scale-90 active:bg-gray-200 ">
// 					<input
// 						hidden
// 						type="submit"
// 						placeholder="제출하기"
// 					/>
// 					회원가입
// 				</label>
// 			</form>
// 		</div>
// 	);
// }

'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = await signIn('credentials', {
			redirect: false,
			email,
			password,
		});

		if (result?.error) {
			setError(result.error);
		} else {
			router.push('/');
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{error && <p>{error}</p>}
				<button type="submit">Sign In</button>
			</form>
		</div>
	);
}
