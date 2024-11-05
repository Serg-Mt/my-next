import useSWR from 'swr';
import { ObjTable } from '.';
import { jsphColumns } from './test';
import toast from 'react-hot-toast';


export function ServerModificationDemo() {
  return <>
    <Main />
  </>;
}

const
  API_URL = 'http://localhost:3333/users',
  fetcher = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('fetch ' + response.status);
    return await response.json();
  },
  columns = jsphColumns.concat({
    title: 'actions', content: () => <>
      {/* <button data-action='info'>ℹ️</button>
      <button data-action='edit'>✏️</button> */}
      <button data-action='del'>❌</button>
    </>
  });


function Main() {
  const
    { data, error, isLoading, isValidating, mutate } = useSWR(API_URL, fetcher),
    onClick = async event => {
      const
        id = event.target.closest('[data-id')?.dataset?.id,
        action = event.target.closest('[data-action')?.dataset?.action;
      console.log('onClick', { action, id });
      if (!action) return;
      let optimisticData;
      const
        getPromise = () => {
          switch (action) {
            case 'del':
              if (!id) return;
              console.log('action del');
              optimisticData = data.filter(el => String(el.id) !== id);
              return fetch(API_URL + '/' + id, { method: 'DELETE' })
                .then(async res => {
                  if (!res.ok) {
                    throw (new Error(res.status + ' ' + res.statusText));
                  }
                });

          }

        },
        promise = getPromise();
      if (promise) {
        toast.promise(promise, {
          loading: 'Fetching ' + action,
          success: 'ok',
          error: (err) => `${err.toString()}`,
        });
        await mutate(promise.then(fetcher, fetcher), { optimisticData, populateCache: true, revalidate: false });
      }


    };
  return <>
    <div style={{ position: 'absolute', fontSize: 'xxx-large' }}>
      {isLoading && <>⌛</>}
      {isValidating && <>👁</>}
    </div>
    {error && <div className='error'> ERROR {error.toString()}</div >}
    <div onClick={onClick}>
      {data && <ObjTable data={data} columns={columns} />}
    </div>

  </>

}