import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import AccountForm from './account-form'

const Account = async () => {
    const supabase = createServerComponentClient({cookies})
    const {data: {user}} = await supabase.auth.getUser()

    return <AccountForm user={user}/>
};
export default Account
