import * as React from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Outlet,useNavigate } from 'react-router-dom'
import { SignedIn,  } from '@clerk/clerk-react'
import NavHeader from '../components/navbar/NavHeader'
import SideNav from '../components/sidebar/SideNav'

import Loader from '../components/Loader'

import { ToastProvider } from '../hooks/ToastContext'
import Toast from '../hooks/Toast'


export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth()
  const navigate = useNavigate()

  //console.log('test', userId)

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/auth')
    }
  }, [isLoaded, userId,navigate])

  if (!isLoaded) return (<Loader/>
)

  return (
    <><SignedIn>
      <ToastProvider>
    <div className='sized'>

      <NavHeader/>

      <div className='w-full h-[90%] flex overflow-hidden'>

        <SideNav/>
        <div className='flex-grow h-full border-l-[0.5px] border-t-[0.5px] overflow-hidden'>
          <Outlet />
        </div>
      </div>
    </div>
    <Toast/>
    </ToastProvider>
  </SignedIn>
  
  
  </>
  
  
)
}