import {createClient} from '@/utils/supabase/server';
import {Box} from '@mui/material';
import {cookies} from 'next/headers';
import NotesTable from "@/components/notes/NotesTable";
import Typography from "@mui/material/Typography";

const Notes = (): JSX.Element => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);

    const getNotes = async () => {
        const {data: notes} = await supabase.from("notes").select();
        return notes
    };

    return (
        <Box sx={{height: 520, width: '100%'}}>
            <Typography variant="h2">Recent notes</Typography>
            <NotesTable notes={getNotes}/>
        </Box>
    )
};
export default Notes
