import React from 'react'

import { useAuth } from '@clerk/clerk-react'
import { Outlet, useNavigate } from 'react-router'
import LoaderNew from '../ui/LoaderNew'




const AuthLayout = () => {
    const { userId, isLoaded } = useAuth()
  const navigate = useNavigate()

  

  React.useEffect(() => {
    if (userId) {
      navigate('/app')
    }
  }, [isLoaded])

  if (!isLoaded) return <LoaderNew/>
  return (
    <div className='w-full h-full'>
        <Outlet />
    </div>
  )
}

export default AuthLayout


