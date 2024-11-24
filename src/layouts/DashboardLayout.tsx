import * as React from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Outlet, useNavigate } from 'react-router-dom'
import { SignedIn,  } from '@clerk/clerk-react'
import NavHeader from '../components/navbar/NavHeader'
import SideNav from '../components/sidebar/SideNav'
import OverviewPage from '../pages/OverviewPage'

export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth()
  const navigate = useNavigate()

  //console.log('test', userId)

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/auth')
    }
  }, [isLoaded, userId,navigate])

  if (!isLoaded) return 'Loading...'

  return (
    <><SignedIn>
    <div className='sized'>
      <NavHeader/>
      <div className='w-full h-[90%] flex'>
        <SideNav/>
        <div className='flex-grow h-full bg-slate-300 flexed '>
          <OverviewPage/>
        </div>
        
      </div>
      
    
    </div>
    
  </SignedIn>
  
  
  </>
  
  
)
}