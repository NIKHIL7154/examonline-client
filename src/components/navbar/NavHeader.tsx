import { UserButton } from '@clerk/clerk-react'

import { useUser } from '@clerk/clerk-react'

const NavHeader = () => {
  const {user}=useUser()
  return (
    <div className='w-full h-[10%]  m-0 flex items-center pr-10'>
        <div className="text-lg w-[50%] h-full  flexed !justify-start">
          <div className='h-full w-[10%] flexed'>
          <img className='h-[50%] w-[]' src="https://www.svgrepo.com/show/288255/exam.svg" alt="" />
            </div>
        <h1 className='text-lg'>ExamFusion</h1>
        </div>
        
        <div className="flexed !justify-end gap-6 w-[50%]">
        <UserButton/>
        <p>{user?.fullName}</p>
        
        </div>
        
    </div>
  )
}

export default NavHeader