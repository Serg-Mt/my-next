import { useMemo, useState } from 'react';
import { Fetcher } from '.';
import { User } from '../JSPH/User';

export function TestFetcher() {
  return <>
    <Test1 />
    <Test2 />
    <Test3 />
  </>;

}

function Test1() {
  const
    [id, setId] = useState(1),
    [data, setData] = useState(null),
    url = useMemo(() => new URL('https://jsonplaceholder.typicode.com/users/' + id), [id]);
  return <fieldset>
    <input type="number" value={id} onInput={event => setId(+event.target.value)} />
    <Fetcher url={url} setData={setData}>
      <User user={data} />
    </Fetcher>
  </fieldset>
}

function UserList({ users }) {
  return <ol>
    {users.map(({ name }) => <li key={name}>{name}</li>)}
  </ol>
}

function Test2() {
  const
    [data, setData] = useState(null),
    url = 'https://jsonplaceholder.typicode.com/users/';
  return <fieldset>
    <Fetcher url={url} setData={setData}>
      <UserList users={data} />
    </Fetcher>
  </fieldset>
}

function Test3() {
  const
    [data, setData] = useState(null);
  return <fieldset>
    {data
      ? <UserList users={data} />
      : <button onClick={() => {
        fetch('https://jsonplaceholder.typicode.com/users/')
          .then(res => res.json())
          .then(users => setData(users));
      }}>load</button>}
  </fieldset>
}