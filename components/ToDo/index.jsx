import { useState } from 'react';



export function ToDoApp() {
  const
    [list, setList] = useState([new ListItem('дело 1'), new ListItem('дело 2')]),

    delItem = id => setList(prev => {
      // const
      //   index = prev.findIndex(item => item.id === id);
      // return prev.toSpliced(index, 1)
      return prev.filter(item => item.id !== id);
    }),
    toggleCheckbox = id => setList(prev => {
      const
        index = prev.findIndex(item => item.id === id);
      return prev.with(index, prev[index].toggleChecked());
    });

  return <fieldset>
    <legend>To Do App</legend>
    <Form
      addItem={text => setList(prev => [...prev, new ListItem(text)])}
    />
    <List
      list={list}
      delItem={delItem}
      toggleCheckbox={toggleCheckbox}
    />
  </fieldset>
}

function Item({ item, delItem, toggleCheckbox }) {
  console.debug('Item', item);
  const
    { id, checked, text } = item;
  return <li>
    <input type="checkbox" checked={checked} onChange={() => toggleCheckbox(id)} />
    {checked && '✔'}
    {text}
    <Button onClick={() => delItem(id)}>❌</Button>
  </li>
}

function Form({ addItem }) {
  console.debug('Form');
  const
    [value, setValue] = useState('-start-');
  return <fieldset>
    <legend>Form</legend>
    <input value={value} onInput={({ target: { value } }) => setValue(value)} />
    <Button onClick={() => { addItem(value); setValue('') }}>Add</Button>
  </fieldset>
}

function List({ list, delItem, toggleCheckbox }) {
  console.debug('List');
  return <fieldset>
    <legend>List</legend>
    <ol>
      {list.map(item => <Item key={item.id} item={item} delItem={delItem} toggleCheckbox={toggleCheckbox} />)}
    </ol>
  </fieldset>
}

function Button({ onClick, children }) {
  console.debug('Button');
  return <button onClick={onClick}>
    {children}
  </button>
}

class ListItem {
  checked = false;
  id = Math.random();

  constructor(text) {
    Object.assign(this, { text });// this.text = text
  }
  toggleChecked() {
    this.checked = !this.checked;
    return this;
  }
}