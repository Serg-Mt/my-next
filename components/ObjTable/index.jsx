import { useState } from 'react';

export function ObjTable({ data, columns, children }) {
  const
    [search, setSearch] = useState(''),
    filteredData = data.filter(obj => {
      if (!search) return true;
      for (const { content, getData } of columns) {
        if (content(obj)?.includes?.(search)) return true;
        if (getData && getData(obj)?.includes?.(search)) return true;
      }
      // for (const key in obj) {
      //   if (obj[key]?.includes?.(search)) return true;
      // }
      return false;
    })
  return <>
    <input type="search" value={search} onInput={ev => setSearch(ev.target.value)} />
    <SimpleTable data={filteredData} columns={columns}>
      {children}
    </SimpleTable>
  </>
}



function SimpleTable({ data, columns, children }) {
  return <table>
    <thead>
      <tr>
        {columns.map(({ title }) => <td key={title}>{title}</td>)}
      </tr>
    </thead>
    <tbody>
      {data.map(obj => <tr key={obj.id} data-id={obj.id}>
        {columns.map(({ title, content }) => <td key={title}>
          {content(obj)}
        </td>)}       
      </tr>)}
      {children}
    </tbody>
  </table>;
}