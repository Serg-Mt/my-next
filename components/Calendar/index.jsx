import { useContext, useMemo, useState } from 'react';
import classes from './calendar.module.css';
import { LocaleContext } from './LocaleContexr';


export function DemoCalendarApp() {
  const
    [locale, setLocale] = useState('ru');
  return <>
    <label>
      locale:
      <select value={locale} onChange={event => setLocale(event.target.value)}>
        {['ru', 'en', 'ar', 'zh', 'ko', 'ja']
          .map(l => <option key={l} value={l}>{l}</option>)}
      </select>
    </label>
    <h1>Calendar Demo</h1>
    <LocaleContext.Provider value={locale}>
      <Demo1 />
      <Demo2 />
      <Demo3 />
    </LocaleContext.Provider>
  </>;
}

function DateToYYYYMM(date) {
  return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0');
}

function YYYYMMToDate(str) {
  const [year, month] = str.split('-');
  return new Date(year, month - 1, 1);
}

function Demo1() {
  const [value, setValue] = useState(DateToYYYYMM(new Date));
  return <fieldset>
    <input type="month" value={value} onChange={event => setValue(event.target.value)} />
    <Calendar date={YYYYMMToDate(value)} />
  </fieldset>
}

function Demo2() {
  return <LocaleContext.Provider value='ko'>
    <fieldset>
      <Calendar date={new Date} />
    </fieldset>
  </LocaleContext.Provider>
}

function Demo3() {
  return <fieldset><input type="date" /></fieldset>
}

function Calendar({ date }) {
  const
    locale = useContext(LocaleContext),
    dayNames = useMemo(() => Array.from({ length: 7 }, (_, index) => <td key={index}>{(new Date(2019, 0, index)).toLocaleDateString(locale, { weekday: 'short' })}</td>), [locale]),
    caption = date.toLocaleDateString(locale, { month: 'long', year: 'numeric' }),
    year = date.getFullYear(),
    month = date.getMonth(),
    max = (new Date(year, month + 1, 0)).getDate(),
    weekDay = (new Date(year, month, 1)).getDay(), // ВС=0 ПН=1 ВТ=2 .. СБ=6 
    shift = (-1 + weekDay + 7) % 7;                //      ПН=0 ВТ=1 .. СБ=5 ВС=6
    
  return <table className={classes.calendar}>
    <caption>{caption}</caption>
    <thead><tr>{dayNames}</tr></thead>
    <Month shift={shift} max={max} />
  </table>
}

function Month({ shift, max }) {
  const
    arr = [];
  for (let start = 1 - shift; start <= max; start += 7) {
    arr.push(<Week key={start} start={start} max={max} />)
  }
  return <tbody>{arr}</tbody>;
}

function Week({ start, max }) {
  const
    arr = [];
  for (let day = start; day < start + 7; day++)
    arr.push(<td key={day}>
      {day >= 1 && day <= max && day}
    </td>);
  return <tr>{arr}</tr>
}