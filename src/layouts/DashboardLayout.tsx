import * as React from 'react'
import { RedirectToSignIn, useAuth } from '@clerk/clerk-react'
import { Outlet, useNavigate } from 'react-router-dom'
import { SignedIn, SignedOut} from '@clerk/clerk-react'

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
    
    <Outlet />
  </SignedIn>
  <SignedOut>
    <RedirectToSignIn/>
  </SignedOut>
  
  </>
  
  
)
}