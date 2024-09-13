import Link from 'next/link';
export default function Home() {
	return (
		<div className="p-10 grow flex flex-col w-full h-full items-center justify-center gap-9">
			<h1>client side rendering/ server side rendering Todo</h1>
			<div className="flex flex-row gap-4">
				<Link href={'/calendar/csr'}>
					<button className="bg-blue-700 p-10 hover:scale-95 active:scale-90 transition-all">
						CSR
					</button>
				</Link>
				<Link href={'/calendar/ssr'}>
					<button className="bg-red-700 p-10  hover:scale-95 active:scale-90 transition-all">
						SSR
					</button>
				</Link>
			</div>
			{/* <button onClick={() => signOut()}>로그아웃</button> */}

			{/* <button
				onClick={async () =>
					await signIn('credential', { callbackUrl: '/' })
						.then((result) => {})
						.catch(() => alert('로그인에 일시적 오류가 발생하였습니다'))
				}>
				로그인하기
			</button> */}
		</div>
	);
}
