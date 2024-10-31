import { useState } from 'react'
import { Fetcher } from '../Fetcher'
import { ObjTable } from '.';

export function TestObjTable() {
  return <>
    {/* <Test1 /> */}
    <Test2 />
  </>
}

export function Email({ email }) {
  return <a href={'mailto:' + email}>{email}</a>
}

export function MapLink({ geo, text }) {
  return <a href={`https://maps.google.com/maps?ll=${geo.lat},${geo.lng}`} >{text}</a>
}


function Test2() {
  const
    [films, setFilms] = useState(null),
    columns = [
      { title: 'Id', content: obj => obj.id },
      { title: 'Title', content: ({ Title }) => Title },
      { title: 'Year', content: ({ Year }) => Year }
    ];
  return <fieldset>
    <Fetcher
      url="https://www.omdbapi.com/?apikey=a2b07930&s=red"
      setData={({ Search }) => setFilms(Search.map(obj => Object.assign({}, obj, { id: obj.imdbID })))}
    >
      <ObjTable data={films} columns={columns} />
    </Fetcher>
  </fieldset>
}

function Test1() {
  const
    [users, setUsers] = useState(null),
    columns = [
      { title: 'Id', content: user => +user.id },
      { title: 'Name', content: ({ name }) => name },
      { title: 'Phone', content: ({ phone }) => <a href={'tel:phone'}>{phone}</a> },
      { title: 'Email', content: ({ email }) => <Email email={email} /> },
      { title: 'address', content: (({ address }) => <MapLink geo={address.geo} text={`${address.city} ${address.street} ${address.suite}`} />) }

    ];
  return <fieldset>
    <Fetcher
      url="https://jsonplaceholder.typicode.com/users"
      setData={setUsers}
    >
      <ObjTable data={users} columns={columns} />
    </Fetcher>
  </fieldset>
}