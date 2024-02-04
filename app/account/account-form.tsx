'use client'
import {FC, JSX, useCallback, useEffect, useRef, useState} from 'react'
import {createClientComponentClient, User} from '@supabase/auth-helpers-nextjs'
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {toast, ToastContainer} from 'react-toastify';
import {useAppDispatch, useAppSelector} from "@/state/hooks";
import {setAuthenticated} from "@/state/features/user/userSlice";

type UpdateProfileProps = {
    username: string | null
    fullname: string | null
    website: string | null
    avatar_url: string | null
}

type Props = { user: User | null }

const AccountForm: FC<Props> = ({user}): JSX.Element => {
    const initialized = useRef(false)
    const dispatch = useAppDispatch();
    if (!initialized.current) {
        initialized.current = true
    }
    dispatch(setAuthenticated(true))
    const appUser = useAppSelector(state => state.user)
    const supabase = createClientComponentClient()
    const [loading, setLoading] = useState(true)
    const [fullname, setFullname] = useState<string | null>(null)
    const [username, setUsername] = useState<string | null>(null)
    const [website, setWebsite] = useState<string | null>(null)
    const [avatar_url, setAvatarUrl] = useState<string | null>(null)

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)

            const {data, error, status} = await supabase
                .from('profiles')
                .select(`full_name, username, website, avatar_url`)
                .eq('id', user?.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setFullname(data.full_name)
                setUsername(data.username)
                setWebsite(data.website)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            toast.error('Error loading user data!')
        } finally {
            setLoading(false)
        }
    }, [user, supabase])

    useEffect(() => {
        getProfile().then(r => r)
    }, [user, getProfile])

    async function updateProfile({username, website, avatar_url,}: UpdateProfileProps) {
        try {
            setLoading(true)

            const userUpdate = {
                id: user?.id as string,
                full_name: fullname,
                username,
                website,
                avatar_url,
                updated_at: new Date().toISOString(),
            };
            const {error} = await supabase.from('profiles').upsert(userUpdate)
            if (error) throw error
            toast.info('Profile updated!')
        } catch (error) {
            toast.error('Error updating the data!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Grid container>
            <ToastContainer/>
            <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography variant="h2" sx={{m: 2}}>
                    Profile
                </Typography>
                <TextField
                    label="Email"
                    id="email"
                    type="text"
                    value={user?.email}
                    sx={{mb: 2}}
                    disabled
                />
                <TextField
                    label="Full Name"
                    id="fullName"
                    type="text"
                    value={fullname || ''}
                    onChange={(e) => setFullname(e.target.value)}
                    sx={{mb: 2}}
                />
                <TextField
                    label="Username"
                    id="username"
                    type="text"
                    value={username || ''}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{mb: 2}}
                />
                <TextField
                    label="Website"
                    id="website"
                    type="url"
                    value={website || ''}
                    onChange={(e) => setWebsite(e.target.value)}
                    sx={{mb: 2}}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={() => updateProfile({fullname, username, website, avatar_url})}
                    disabled={loading}
                    sx={{mb: 2, p: 1}}
                >
                    {loading ? 'Loading ...' : 'Update'}
                </Button>
                <Box component="form" action="/auth/signout" method="post" noValidate sx={{mb: 2}}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="warning"
                    >
                        Sign out
                    </Button>
                </Box>
            </Box>
        </Grid>
    )
};
export default AccountForm
