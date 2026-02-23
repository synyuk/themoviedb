import { useMemo, useState } from 'react'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Autocomplete from '@mui/material/Autocomplete'

function Search({ movieList, onSendData }) {
  const [inputValue, setInputValue] = useState('')

  const movieTitles = useMemo(
    () => movieList
      .map((item) => item.title || item.original_title || '')
      .filter(Boolean),
    [movieList]
  )

  const handleInputChange = (_event, value) => {
    setInputValue(value)
    onSendData(value)
  }

  const handleOptionChange = (_event, value) => {
    const selected = typeof value === 'string' ? value : value?.title || ''
    setInputValue(selected)
    onSendData(selected)
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Autocomplete
        id="movie-search"
        freeSolo
        options={movieTitles}
        inputValue={inputValue}
        renderInput={(params) => <TextField {...params} label="Search movies" />}
        onInputChange={handleInputChange}
        onChange={handleOptionChange}
      />
    </Stack>
  )
}

export default Search
