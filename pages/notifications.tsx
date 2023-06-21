import Header from "@/components/Header";
import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import NotificationsFeed from "@/components/NotificationsFeed";

export async function getServerSideProps(ctx: NextPageContext) {
    const session = await getSession(ctx);
    if(!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
    return {
        props: {
            session
        }
    }
}

const Notifications = () => {
    return ( 
        <>
        <Header label="Notifications" showBackButton />
        <NotificationsFeed/>
        </>
     );
}
 
export default Notifications;