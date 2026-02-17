import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function FreeSolo({ movieList, onSendData }) {
    const top100Films = movieList;
    const sendDataToParent = ((event, value) => {
        onSendData(value);
    });
    return (
        <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={top100Films.map((option) => option.title)}
                renderInput={(params) => <TextField {...params} label="Search" />}
                onInputChange={sendDataToParent}
            />
        </Stack>
    );
}