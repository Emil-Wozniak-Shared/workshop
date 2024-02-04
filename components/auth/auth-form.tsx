'use client'
import {Auth} from '@supabase/auth-ui-react'
import {ThemeSupa} from '@supabase/auth-ui-shared'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'

/**
 * @see https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs?language=ts&database-method=dashboard#project-setup
 * @constructor
 */
const AuthForm = (): JSX.Element => {
    const supabase = createClientComponentClient()

    return (
        <Auth
            supabaseClient={supabase}
            view="magic_link"
            appearance={{theme: ThemeSupa}}
            theme="dark"
            showLinks={false}
            providers={[]}
            redirectTo="http://localhost:3000/auth/callback"
        />
    )
};
export default AuthForm
