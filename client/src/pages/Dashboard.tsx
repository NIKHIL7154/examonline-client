import { useUser } from '@clerk/clerk-react'
import Row from "../ui/Row";
// import { HiPlus } from "react-icons/hi";

function Dashboard() {
    const { user } = useUser();

    return (
        <>
            <Row type="horizontal">
                <h1 className="text-3xl font-medium">Hello {user?.firstName}</h1>
            </Row>
        </>
    );
}

export default Dashboard;
