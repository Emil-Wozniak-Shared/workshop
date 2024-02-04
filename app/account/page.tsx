import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import AccountForm from './account-form'
import {redirect} from "next/navigation";

const Account = async () => {
    const supabase = createServerComponentClient({cookies})
    const {data: {user}} = await supabase.auth.getUser()

    if (user) {
        return <AccountForm user={user}/>
    } else {
        redirect("/login")
    }
};
export default Account
