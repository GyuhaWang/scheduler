export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="w-screen h-screen flex flex-col items-center justify-center">
			<div className="p-4 w-[50%] border-black border-2 rounded-xl">
				{children}
			</div>
		</div>
	);
}
