import { Outlet, useNavigate } from 'react-router'
import { ClerkProvider,  } from '@clerk/clerk-react'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

export default function RootLayout() {
  const navigate = useNavigate()
  
  return (
    <ClerkProvider
    
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
      
      
    >
      {/* <main className='sized flexed overflow-hidden relative'> */}
        
        <Outlet />
      {/* </main> */}
    </ClerkProvider>
  )
}