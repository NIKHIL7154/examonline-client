import { useEffect, useState } from 'react'

import SidebarData from './SidebarData';
import SideItem from './SideItem';
import { useNavigate } from 'react-router-dom';
import {useToast} from '../../hooks/ToastContext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const SideNav = () => {
  
  const [active, setActive] = useState(false)
  const [menuItem, setmenuItem] = useState("/app")
  const navigate = useNavigate();
  const {showToast} = useToast()
  useEffect(() => {
    if(menuItem){
      navigate(menuItem)
      if (menuItem != "/app") showToast("Redirecting to "+menuItem,"success")
      console.log("Redirecting to "+menuItem)
    }
    return () => {
      
    };
  }, [menuItem]);

  return (
    <div
    
    className={`h-full
      flex
      flex-col
      items-center
      justify-between
      ${active ? 'w-[15%]' : 'w-[5%]'}
      duration-500
      gap-2
      `}>
        <div className='w-full flex
      flex-col
      items-center gap-2'>
        {SidebarData.map((item, index) => {
          return <SideItem key={index} item={item} active={active} action={{menuItem,setmenuItem}}/>
        })}
        </div>
        <button className='w-full text-3xl my-5' onClick={()=>{setActive(!active)}}>
          {active ? <ArrowBackIosIcon/> : <ArrowForwardIosIcon/>}
        </button>
        
      </div>
  )
}

export default SideNav