import prisma from '@/lib/prisma';
import React from 'react';

type PropsType = {
	name: string;
};

type User = {
	id: number;
	name: string;
	score: number | null;
};

const GetUserData = async ({ name }: PropsType) => {
	try {
		const users: User[] = await prisma.user.findMany({
			orderBy: {
				score: 'desc',
			},
			take: 10,
		});
		return (
			<ul>
				{users.map((user, index) => (
					<div
						key={index}
						className='flex justify-between items-center text-2xl p-3 bg-black/30 border border-red-900/50 rounded'
					>
						<span className={`text-lg ${user.name === name ? 'text-red-500' : 'text-white'}`}>
							{index + 1}.{user.name}
						</span>
						<span className='text-red-500'>{user.score}</span>
					</div>
				))}
			</ul>
		);
	} catch (err) {
		return <div>ユーザーデータの取得に失敗しました。</div>;
	}
};

export default GetUserData;
