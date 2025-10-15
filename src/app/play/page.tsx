import React from 'react';

import GameContent from '@/components/GameContent';
import GetUserData from '@/components/GetUserData';

type PropsType = {
	searchParams: Promise<{ name?: string }>;
};

const StartPage = async ({ searchParams }: PropsType) => {
	const params = await searchParams;
	const name = params.name || 'Guest';

	const questions = [
		{ question: 'React' },
		{ question: 'Next.js' },
		{ question: 'TypeScript' },
		{ question: 'Tailwind-CSS' },
		{ question: 'GitHub' },
	];
	return (
		<GameContent questions={questions} name={name}>
			<GetUserData name={name} />
		</GameContent>
	);
};

export default StartPage;
