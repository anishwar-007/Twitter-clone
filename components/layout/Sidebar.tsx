import {BsHouseFill, BsBellFill} from 'react-icons/bs'
import {FaUser} from 'react-icons/fa'
import {BiLogOut} from 'react-icons/bi';
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarTweetButton from './SidebarTweetButton';
import useCurrentUser from '@/hooks/useCurrentUser';
import {signOut} from 'next-auth/react';

const Sidebar = () => {
    const {data: currentUser} = useCurrentUser();
    const icons = [
        {
            name: "Home",
            icon: BsHouseFill,
            href: "/",
        },
        {
            name: "Notifications",
            icon: BsBellFill,
            href: "/notifications",
            auth: true,
            alert: currentUser?.hasNotification,
        },
        {
            name: "Profile",
            icon: FaUser,
            href: `/users/${currentUser?.id}`,
            auth: true,
        },

    ]
    return ( 
        <div className='col-span-1 h-full md:pr-8'>
            <div className='flex flex-col items-end'>
                <div className='space-y-2 lg:w-[230px]'>
                    <SidebarLogo/>
                    {icons.map((icon, i) => (
                        <SidebarItem key={i} icon={icon.icon} label={icon.name} href={icon.href} auth={icon.auth} alert={icon.alert} />
                    ))}
                    { currentUser &&
                        <SidebarItem icon={BiLogOut} label="Logout" href="/logout" onClick={() => signOut()} />
                    }
                <SidebarTweetButton/>
                </div>
            </div>

        </div>
     );
}
 
export default Sidebar;