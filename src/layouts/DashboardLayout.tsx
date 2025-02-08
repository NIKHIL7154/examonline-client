
import { useAuth } from '@clerk/clerk-react'
import { Outlet, useNavigate } from 'react-router-dom'
import { SignedIn, useUser } from '@clerk/clerk-react'
import NavHeader from '../components/navbar/NavHeader'
import SideNav from '../components/sidebar/SideNav'



import { ToastProvider } from '../hooks/ToastContext'
import Toast from '../hooks/Toast'
//import LoaderNew from '../components/LoaderNew'
import { useEffect, useState } from 'react'
import VerifyUserInDataBase from '../pages/verificationPage/VerifyUserInDataBase'


export default function DashboardLayout() {

  const [userVerification, setuserVerification] = useState(true);
  const { userId, isLoaded } = useAuth()
  const navigate = useNavigate()



  const { user } = useUser();


  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/auth')
      return;
    }




  }, [isLoaded, userId, navigate])



  if (!isLoaded) return (<VerifyUserInDataBase />)
  //uncomment this to verify user in database
  //if(userVerification) return (<VerifyUserInDataBase user={user} updateState={setuserVerification}/>)

  return (
    <><SignedIn>
      <ToastProvider>
        <div className='sized'>

          <NavHeader />

          <div className='w-full h-[90%] flex overflow-hidden'>

            <SideNav />
            <div className='flex-grow h-full border-l-[0.5px] border-t-[0.5px] overflow-hidden'>
              <Outlet />
            </div>
          </div>
        </div>
        <Toast />
      </ToastProvider>
    </SignedIn>


    </>


  )
}