import { useState, useCallback, memo, useRef } from 'react';



export function ToDoApp() {
  const
    [list, setList] = useState([new ListItem('дело 1'), new ListItem('дело 2')]),

    delItem = useCallback(id => setList(prev => {
      // const
      //   index = prev.findIndex(item => item.id === id);
      // return prev.toSpliced(index, 1)
      return prev.filter(item => item.id !== id);
    }), []),
    toggleCheckbox = useCallback(id => setList(prev => {
      const
        index = prev.findIndex(item => item.id === id);
      return prev.with(index, prev[index].cloneAndToggleChecked());
    }), []),
    addItem = useCallback(text => setList(prev => [...prev, new ListItem(text)]), []);
  return <fieldset>
    <legend>To Do App</legend>
    <Form
      addItem={addItem}
    />
    <List
      list={list}
      delItem={delItem}
      toggleCheckbox={toggleCheckbox}
    />
  </fieldset>
}

const Item = memo(function ({ item, delItem, toggleCheckbox }) {
  console.debug('Item', item);
  const
    { id, checked, text } = item,
    onClick = useCallback(() => delItem(id), [id]);
  return <li>
    <input type="checkbox" checked={checked} onChange={() => toggleCheckbox(id)} />
    {checked && '✔'}
    {text}
    <Button onClick={onClick}>❌</Button>
  </li>
});

const Form = memo(function ({ addItem }) {
  console.debug('Form');
  const
    [value, setValue] = useState('-start-'),
    ref = useRef(null),
    onClick = useCallback(() => { addItem(ref.current); /* setValue('') */ }, []);
  ref.current = value;
  
  return <fieldset>
    <legend>Form</legend>
    <input value={value} onInput={({ target: { value } }) => setValue(value)} />
    <Button onClick={onClick}>Add</Button>
  </fieldset>
});

function List({ list, delItem, toggleCheckbox }) {
  console.debug('List');
  return <fieldset>
    <legend>List</legend>
    <ol>
      {list.map(item => <Item key={item.id} item={item} delItem={delItem} toggleCheckbox={toggleCheckbox} />)}
    </ol>
  </fieldset>
}

const Button = memo(function ({ onClick, children }) {
  console.debug('Button', children);
  return <button onClick={onClick}>
    {children}
  </button>
});

class ListItem {
  checked = false;
  id = Math.random();

  constructor(text) {
    Object.assign(this, { text });// this.text = text
  }
  cloneAndToggleChecked() {
    const clone = new ListItem;
    Object.assign(clone, this, { checked: !this.checked });
    return clone;
  }
}