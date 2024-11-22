import { UserButton } from '@clerk/clerk-react'



const NavHeader = () => {
  return (
    <div className='w-full h-[10%]  m-0 flex justify-between items-center px-10'>
        <h1 className='text-lg'>ExamOnline</h1>
        <div className="flexed gap-6">
        <UserButton/>
        <p>Nikhil</p>
        </div>
        
    </div>
  )
}

export default NavHeader