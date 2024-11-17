import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

//type Props = {}
{/* <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header> */}
const AuthLogin = () => {
  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
            <SignedOut>
                <SignInButton>
                <button className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.35 11.1h-9.18v2.72h5.32c-.23 1.24-.93 2.29-1.98 2.98v2.48h3.18c1.86-1.72 2.94-4.26 2.94-7.18 0-.47-.04-.93-.1-1.38z" />
                        <path d="M12.17 21.82c2.7 0 4.96-.9 6.61-2.42l-3.18-2.48c-.88.6-1.98.96-3.43.96-2.64 0-4.87-1.78-5.66-4.16h-3.3v2.6c1.65 3.26 5.04 5.5 8.96 5.5z" />
                        <path d="M6.51 13.72c-.2-.6-.31-1.24-.31-1.9s.11-1.3.31-1.9v-2.6h-3.3c-.66 1.3-1.04 2.76-1.04 4.5s.38 3.2 1.04 4.5l3.3-2.6z" />
                        <path d="M12.17 4.98c1.48 0 2.8.51 3.84 1.5l2.86-2.86c-1.66-1.54-3.91-2.48-6.7-2.48-3.92 0-7.31 2.24-8.96 5.5l3.3 2.6c.79-2.38 3.02-4.16 5.66-4.16z" />
                    </svg>
                    Continue with Google
                </button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    </div>
  )
}

export default AuthLogin