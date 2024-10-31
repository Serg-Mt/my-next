import { useEffect, useState } from 'react';
import { Spinner } from '../Spinner';

export function Fetcher({ url, setData, children }) {
  const
    [result, setResult] = useState(null);
  console.debug('Fetcher', { result });

  useEffect(() => {
    async function getData() {
      setResult(null);
      try {
        const
          response = await fetch(url),
          data = await response.json();
        if (!response.ok) throw new Error(response.status);
        setData(data);
        setResult(true);
      } catch (error) {
        setResult(error);
      }

    }
    getData();
  }, [url]);

  if (result instanceof Error)
    return <div className='error'>
      ERROR {result.toString()}
    </div>;
  if (result) {
    return <>{children}</>
  }
  return <Spinner />
}