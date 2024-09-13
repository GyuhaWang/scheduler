'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
export default function Home() {
	const onSubmit = async (data: FormData) => {
		try {
			await signIn('credentials', {
				uid: data.get('uid'),
				password: data.get('password'),
				redirect: true,
				callbackUrl: '/',
			});
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<div className="w-full h-full justify-center flex flex-col gap-4">
			<p className="text-3xl text-center">로그인</p>
			<form
				className="flex flex-col gap-4"
				id="login-form"
				action={onSubmit}>
				<input
					className="p-2 border-black border-2 outline-none "
					id="login-uid"
					name="uid"
					placeholder="email"
				/>
				<input
					className="p-2 border-black border-2 outline-none  "
					id="login-password"
					name="password"
					type="password"
					placeholder="password"
				/>
				<label className="p-2 items-center justify-center text-center border-black border-2 rounded-3xl hover:scale-95 hover:bg-gray-100 transition-all active:scale-90 active:bg-gray-200 ">
					<input
						hidden
						type="submit"
						placeholder="제출하기"
					/>
					로그인
				</label>
			</form>
			<div className="flex justify-between">
				<Link
					className="hover:underline hover:text-blue-600"
					href={'signin'}>
					회원가입
				</Link>
				<Link
					className="hover:underline hover:text-blue-600"
					href={'signin'}>
					아이디/비밀번호 찾기
				</Link>
			</div>
		</div>
	);
}
