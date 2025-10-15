'use server';

import prisma from '@/lib/prisma';

type UserData = {
	name: string;
	score: number;
};

const userPostAction = async (userData: UserData) => {
	const name = userData.name;
	const score = userData.score;

	await prisma.user.create({
		data: {
			name,
			score,
		},
	});
};

export default userPostAction;
