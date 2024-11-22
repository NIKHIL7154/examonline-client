import * as React from 'react'
import { RedirectToSignIn, useAuth } from '@clerk/clerk-react'
import { Outlet, useNavigate } from 'react-router-dom'
import { SignedIn, SignedOut} from '@clerk/clerk-react'
import NavHeader from '../components/navbar/NavHeader'
import SideNav from '../components/sidebar/SideNav'

export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth()
  const navigate = useNavigate()

  console.log('test', userId)

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/login')
    }
  }, [isLoaded])

  if (!isLoaded) return 'Loading...'

  return (
    <><SignedIn>
    <div className='sized'>
      <NavHeader/>
      <div className='w-full h-[90%] flex'>
        <SideNav/>
        <div className='flex-grow h-full bg-slate-300 flexed '>{/* <Outlet /> */}{window.location.pathname} all the pages here</div>
        
      </div>
      
    
    </div>
    
  </SignedIn>
  <SignedOut>
    <RedirectToSignIn/>
  </SignedOut>
  
  </>
  
  
)
}