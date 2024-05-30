import React from 'react'
import Button from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ error }) => {

    const handlerClick = () =>{
      console.log(handlerClick)
    }

    return (
        <>
        <div className="flex flex-col">
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{error.message}</span>
            </div>
            <div className='w-[fit-content]'>
                <Button
                    size='lg'
                    variant='solid'
                    className='w-full font-semibold'
                    onClick={handlerClick}

                    >
                    Iniciar Sesion

                </Button>
            </div>
        </div>
        </>
    )
}

export default ErrorPage