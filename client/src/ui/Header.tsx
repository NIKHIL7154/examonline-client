import { UserButton } from '@clerk/clerk-react'

import { useUser } from '@clerk/clerk-react'

function Header() {
    const { user } = useUser()

    return (
        <div className="bg-gray-50 p-[1rem] px-[3.6rem] border-b border-gray-100 flex gap-5 items-center justify-end h-[62px]">
            <UserButton />
            <p>{user?.fullName}</p>

        </div>
    );
}

export default Header;
