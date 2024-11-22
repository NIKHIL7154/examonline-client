
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';

export interface SidebarDataProps {
    title: string;
    path: string;
    icon: JSX.Element;
}

const SidebarData = [
    {
        title: 'Create Test',
        path: 'createtest',
        icon: <AddIcon/>,
    },
    {
        title:"Overview",
        path:"",
        icon:<BarChartIcon/>
    },
    {
        title: 'Tests',
        path: 'tests',
        icon:<AppRegistrationIcon/>
    },
    {
        title:"Questions",
        path:"questions",
        icon:<CreateIcon/>
    },
    {
        title:"Settings",
        path:"settings",
        icon:<SettingsIcon/>
    }
]
export default SidebarData;