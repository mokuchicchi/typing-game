import React from 'react';

type PlayerResultProps = {
	name: string;
	totalTime: number;
	playerScore: number;
};

const PlayerResult = ({ name, totalTime, playerScore }: PlayerResultProps) => {
	return (
		<div>
			<h2 className='text-6xl my-4'>Result</h2>
			<div className='text-2xl mb-12'>
				<h2>
					<span className='text-white'>Player : </span>
					{name}
				</h2>
				<h2>
					<span className='text-white'>Time : </span>
					{totalTime}
				</h2>
				<h2>
					<span className='text-white'>Score : </span>
					{playerScore}
				</h2>
			</div>
		</div>
	);
};

export default PlayerResult;
