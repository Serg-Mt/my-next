import useSWR from 'swr';
import { ObjTable } from '.';
import { jsphColumns } from './test';


export function ServerModificationDemo() {
  return <>ServerModificationDemo
    <Main />
  </>;
}

const
  API_URL = 'http://localhost:3333/users',
  fetcher = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('fetch ' + response.status);
    return await response.json();
  };

function Main() {
  const
    { data, error, isLoading, isValidating, mutate } = useSWR(API_URL, fetcher);
  return <>
    <div style={{ position: 'absolute', fontSize: 'xxx-large' }}>
      {isLoading && <>⌛</>}
      {isValidating && <>👁</>}
    </div>
    {error && <div className='error'> ERROR {result.toString()}</div >}
    {data && <ObjTable data={data} columns={jsphColumns}/>}
  </>

}