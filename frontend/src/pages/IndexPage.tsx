import { Link } from 'react-router'

export default function IndexPage() {
  return (
    <div className='h-screen flex flex-col justify-center items-center poppins-regular'>
      <h1 className='text-4xl font-semibold w-[450px]'>This is the landing page</h1>
      <div className='w-[450px] text-lg'>
        <ul>
          <li>
            <Link to="/auth">Sign Up</Link>
          </li>
          <li>
            <Link to="/auth">Sign In</Link>
          </li>
          
          <li>
            <Link to="/app">Dashboard</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}