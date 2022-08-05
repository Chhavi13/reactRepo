import React,{useState} from 'react'
import { enGB } from 'date-fns/locale'
import 'react-nice-dates/build/style.css'
import { DatePickerCalendar } from 'react-nice-dates'

interface IProps {}
export const Calender:React.FC<IProps> =()=>{
    const [date, setDate] = useState<any>(new Date())
    return(
        <>
             <DatePickerCalendar date={date} onDateChange={setDate} locale={enGB} />
        </>
    )
}