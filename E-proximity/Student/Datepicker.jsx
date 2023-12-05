import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './Datepicker.css';

function Datepicker() {
  return (
      <LocalizationProvider dateAdapter={AdapterDayjs} className='datepicker'>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Choose date"/>
      </DemoContainer>
      </LocalizationProvider>
  );
}
export default Datepicker;