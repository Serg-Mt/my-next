import { useState, useEffect } from 'react';
import { User } from './User';
import { Spinner } from '../Spinner';


export function GetUser() {
  const
    [id, setId] = useState(1);
  return <>
    <input type="number" value={id} onInput={event => setId(+event.target.value)} />
    <FetchUser id={id} />
  </>;
}

function FetchUser({ id }) {
  const
    [user, setUser] = useState(null),
    [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setUser(null);
        setError(null);
        const
          response = await fetch('https://jsonplaceholder.typicode.com/users/' + id),
          data = await response.json();
        if (!response.ok) throw new Error(response.status);
        setUser(data);
      } catch (err) {
        setError(err);
      }
    }
    load();
  }, [id]);

  if (error)
    return <div className='error'>
      ERROR {error.toString()}
    </div>;
  if (user)
    return <User user={user} />;
  return <Spinner />;

}

