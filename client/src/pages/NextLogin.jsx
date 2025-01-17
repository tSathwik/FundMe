import React from 'react'
import { useNavigate } from 'react-router-dom';

const NextLogin = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        fetch('http://localhost:3000/')
        navigate('/home')
    }
  return (
    <div className="flex justify-center items-center min-h-screen">
        <div className='border-2 border-black w-full max-w-md space-y-4 p-4 rounded-lg'>
            <div className="input-box">
                <label className='block text-sm font-medium text-gray-700'>First Name</label>
                <input type='text' className='w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' placeholder='Enter your first name' required/>
            </div>
            <div className="input-box">
                <label className='block text-sm font-medium text-gray-700'>Last Name</label>
                <input type='text' className='w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' placeholder='Enter your last name' required/>
        </div>
        <div className="input-box">
            <label className='block text-sm font-medium text-gray-700'>Date of Birth</label>
            <input type='date' className='w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' required/>
        </div>
        <div className="">
            <button onClick={(e)=>{handleNext()}}>Next</button>
        </div>
        </div>
    </div>
  )
}

export default NextLogin