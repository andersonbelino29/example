import { FormControl, InputLabel, Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'

const SelectPartner = () => {
  return (
    <div className='demo-space-x'>
      <FormControl>
        <InputLabel id='demo-simple-select-outlined-label'>Parceiro</InputLabel>
        <Select
          label='Parceiro'
          defaultValue=''
          id='demo-simple-select-outlined'
          labelId='demo-simple-select-outlined-label'
        >
          <MenuItem value=''>
            <em>Parceiro</em>
          </MenuItem>
          <MenuItem value={10}>Parceiro 1</MenuItem>
          <MenuItem value={20}>Parceiro 2</MenuItem>
          <MenuItem value={30}>Parceiro 3</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id='demo-simple-select-outlined-label'>Cliente</InputLabel>
        <Select
          label='Cliente'
          defaultValue=''
          id='demo-simple-select-outlined'
          labelId='demo-simple-select-outlined-label'
        >
          <MenuItem value=''>
            <em>Cliente</em>
          </MenuItem>
          <MenuItem value={10}>Cliente 1</MenuItem>
          <MenuItem value={20}>Cliente 2</MenuItem>
          <MenuItem value={30}>Cliente 3</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default SelectPartner
