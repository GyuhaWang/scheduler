import Link from 'next/link';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<Link href={'/'}>home</Link>
			{children}
		</div>
	);
}
