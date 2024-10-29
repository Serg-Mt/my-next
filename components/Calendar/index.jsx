import { useContext, useMemo, useRef, useState, memo } from 'react';
import classes from './calendar.module.css';
import { LocaleContext } from './LocaleContexr';

const Calendar = memo(function ({ date, addClass = '' }) {
  const
    locale = useContext(LocaleContext),
    dayNames = useMemo(() => Array.from({ length: 7 }, (_, index) => <td key={index}>{(new Date(2019, 0, index)).toLocaleDateString(locale, { weekday: 'short' })}</td>), [locale]),
    caption = date.toLocaleDateString(locale, { month: 'long', year: 'numeric' }),
    year = date.getFullYear(),
    month = date.getMonth(),
    day = date.getDate(),
    max = (new Date(year, month + 1, 0)).getDate(),
    weekDay = (new Date(year, month, 1)).getDay(), // ВС=0 ПН=1 ВТ=2 .. СБ=6 
    shift = (-1 + weekDay + 7) % 7,                //      ПН=0 ВТ=1 .. СБ=5 ВС=6
    Month = () => {
      const
        arr = [];
      for (let start = 1 - shift; start <= max; start += 7) {
        arr.push(<Week key={start} start={start} />)
      }
      return <tbody>{arr}</tbody>;
    },
    Week = ({ start }) => {
      const
        arr = [];
      for (let d = start; d < start + 7; d++)
        arr.push(<td key={d} className={d == day ? classes.selected :''}>
          {d >= 1 && d <= max && d}
        </td>);
      return <tr>{arr}</tr>
    };

  console.debug('Calendar render', date, addClass);
  return <table className={classes.calendar + ' ' + addClass}>
    <caption>{caption}</caption>
    <thead><tr>{dayNames}</tr></thead>
    <Month shift={shift} max={max} />
  </table>
});


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
      <DemoGiven />
      <DemoPopUp />
      <DemoResult />
      <DemoSelectDate />
      <Demo1 />
      <DemoCalendarKo />

    </LocaleContext.Provider>
  </>;
}

function DemoResult() {
  const
    [date, setDate] = useState(new Date),
    [open, setOpen] = useState(false),
    savedDate = useRef(null);

  return <fieldset>
    <div
      onClick={() => {
        savedDate.current = date;        //save
        setOpen(true);
      }}
      className={classes.dateindicator}
    >

      {date.toLocaleDateString()}
    </div>
    {open && <PopUpWindwow>
      <SelectDate date={date} setDate={setDate} />
      <button
        onClick={() => {
          setDate(savedDate.current);
          setOpen(false)
        }}
      >
        ❌Отменить
      </button>
      <button
        onClick={() => setOpen(false)}
      >✔Применить
      </button>
    </PopUpWindwow>}
  </fieldset>;
}

function DemoSelectDate() {
  const
    [date, setDate] = useState(new Date),
    [value, setValue] = useState(50)
  return <fieldset>
    <legend>SelectDate demo</legend>
    <input type="range" value={value} onChange={event => setValue(event.target.value)} />{value}
    <div>{date.toLocaleDateString('ru', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', era: 'long' })}</div>
    <SelectDate date={date} setDate={setDate} />
  </fieldset>
}

function SelectDate({ date, setDate }) {
  const
    year = date.getFullYear(),
    month = date.getMonth(),
    monthName = date.toLocaleDateString('ru', { month: 'long' }),
    day = date.getDate(),
    onClick = event => {
      const
        day = +event.target.closest('table.' + classes.calendar + ' tbody td')?.textContent;
      if (!day) return;
      setDate(new Date(year, month, day));
    };
  return <div className={classes.flex + ' ' + classes.center}>
    <input
      onChange={event => setDate(new Date(+event.target.value, month, day))}
      type="number"
      value={year}
      style={{ width: '60px' }}
    /><br />
    <div>
      <button onClick={() => setDate(new Date(year, month - 1, day))}>◀</button>
      {monthName}
      <button onClick={() => setDate(new Date(year, month + 1, day))}>▶</button>
    </div>

    <div onClick={onClick}>
      <Calendar date={date} addClass={classes.nocaption} />
    </div>
  </div>;
}



function DemoPopUp() {
  const
    [open, setOpen] = useState(false);
  return <fieldset>
    <legend>Demo Pop Up</legend>
    <button onClick={() => setOpen(true)}>Open</button>
    {open && <PopUpWindwow>
      <button onClick={() => setOpen(false)}>❌</button>
      <svg width="100%" height="100%" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" >
      
        <circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>

    </PopUpWindwow>}
  </fieldset>
}

function PopUpWindwow({ children }) {
  return <div className={classes.popup}>
    {children}
  </div>
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
    <Calendar date={YYYYMMToDate(value)} addClass={classes.noselected} />
  </fieldset>
}

function DemoCalendarKo() {
  return <LocaleContext.Provider value='ko'>
    <fieldset>
      <Calendar date={new Date} addClass={classes.noselected} />
    </fieldset>
  </LocaleContext.Provider>
}

function DemoGiven() {
  return <fieldset><input type="date" /></fieldset>
}



