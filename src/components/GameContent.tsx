'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import PlayerResult from './PlayerResult';
import userPostAction from '@/actions/user-post-action';
import { redirect, useRouter } from 'next/navigation';

export type GameContentProps = {
	children: ReactNode;
	questions: { question: string }[];
	name: string;
};

const GameContent = (props: GameContentProps) => {
	const { children, questions, name } = props;

	const router = useRouter();
	const [questionNumber, setQuestionNumber] = useState(0);
	const [currentPosition, setCurrentPosition] = useState(0);
	const [isCompleted, setIsCompleted] = useState(false);
	const [startTime, setStartTime] = useState(0);
	const [totalTime, setTotalTime] = useState(0);
	const [playerScore, setPlayerScore] = useState(0);

	const addResult = (name: string, startTime: number) => {
		const endTime = Date.now();
		const time = endTime - startTime;
		const timeInSec = time / 1000;
		const baseScore = 10000;
		const timeDeduction = Math.floor(timeInSec * 100);
		const score = Math.max(1000, baseScore - timeDeduction);
		console.log('エンド');

		return { timeInSec, score };
	};

	const onClickBack = () => {
		redirect('/');
	};

	useEffect(() => {
		setStartTime(Date.now());
		console.log('スタート');
	}, []);

	useEffect(() => {
		const handleKeyDown = async (e: globalThis.KeyboardEvent) => {
			const currentQuestion = questions[questionNumber];
			if (e.key === currentQuestion.question[currentPosition]) {
				setCurrentPosition((prev) => prev + 1);

				if (currentPosition === currentQuestion.question.length - 1) {
					if (questionNumber === questions.length - 1) {
						const { timeInSec, score } = addResult(name, startTime);
						setTotalTime(timeInSec);
						setPlayerScore(score);
						userPostAction({ name, score });
						router.refresh();
						setIsCompleted(true);
					} else {
						setQuestionNumber((prev) => prev + 1);
						setCurrentPosition(0);
					}
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [questionNumber, currentPosition]);

	return isCompleted ? (
		<div className='border mx-120 my-6'>
			<PlayerResult name={name} totalTime={totalTime} playerScore={playerScore} />
			<h1 className='text-4xl my-4'>Ranking</h1>
			{children}
			<button
				onClick={onClickBack}
				className='text-2xl w-36 h-12 my-4 rounded-sm bg-red-500 text-white cursor-pointer hover:opacity-80'
			>
				もう一度
			</button>
		</div>
	) : (
		<div className='my-70'>
			<h1 className='text-4xl mb-20'>
				問題 {questionNumber + 1}/{questions.length}
			</h1>
			<div>
				{questions[questionNumber].question.split('').map((char, index) => (
					<span
						key={index}
						style={{ color: index < currentPosition ? 'red' : 'white' }}
						className='text-9xl'
					>
						{char}
					</span>
				))}
			</div>
		</div>
	);
};

export default GameContent;
