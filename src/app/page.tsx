'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const StartPage = () => {
	const [name, setName] = useState('Guest');
	const router = useRouter();

	const onClickStart = () => {
		router.push(`/play?name=${name}`);
	};
	return (
		<div className='border mx-120 my-60'>
			<h1 className='text-8xl my-10'>Typing Game</h1>
			<input
				type='text'
				value={name}
				onChange={(e) => setName(e.target.value)}
				className='text-4xl w-1/2 h-20 my-8 p-4 border rounded-sm'
			/>
			<br />
			<button
				onClick={onClickStart}
				className='text-4xl w-1/2 h-20 mb-10 rounded-sm bg-red-500 text-white cursor-pointer hover:opacity-80'
			>
				Game Start
			</button>
		</div>
	);
};

export default StartPage;
