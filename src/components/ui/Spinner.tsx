import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader';

const Spinner = ({fullView = false}) => {
  return (
    
    fullView ? <div className='h-screen flex items-center justify-center'> <ClipLoader color="#ff2e00" /> </div>
        : <ClipLoader color="#ff2e00" /> 
  )
}

export default Spinner;