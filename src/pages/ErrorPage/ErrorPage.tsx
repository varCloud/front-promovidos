import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

const ErrorPage = ({ error }) => {
	const handlerClick = () => {
		console.log(handlerClick);
	};

	return (
		<div className='flex flex-col'>
			<div
				className='mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400'
				role='alert'>
				<span className='font-medium'>{error.message}</span>
			</div>
			<div className='w-[fit-content]'>
				<Button
					size='lg'
					variant='solid'
					className='w-full font-semibold'
					onClick={handlerClick}>
					Iniciar Sesion
				</Button>
			</div>
		</div>
	);
};

export default ErrorPage;
