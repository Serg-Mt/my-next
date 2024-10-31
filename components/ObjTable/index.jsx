export function ObjTable({ data, columns }) {
  return <table>
    <thead>
      <tr>
        {columns.map(({ title }) => <td key={title}>{title}</td>)}
      </tr>
    </thead>
    <tbody>
      {data.map(obj => <tr key={obj.id}>
        {columns.map(({ title, content }) => <td key={title}>
          {content(obj)}
        </td>)}
      </tr>)}
    </tbody>
  </table>;
}