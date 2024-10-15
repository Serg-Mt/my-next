import { Component } from 'react'; // React.Component

export class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '-start-',
      todos: [newElement('Дело 1'), newElement('Дело 2')]
    };
  }
  render() {
    return <>
      <input
        value={this.state.value}
        onInput={event => this.setState({ value: event.target.value })}
      />
      <button
        onClick={() => this.setState(prev => (
          {
            todos: [...prev.todos, newElement(prev.value)],
            value: ''
          }))}
      >
        add
      </button>
      <button onClick={() => this.setState(prev => ({ todos: prev.todos.filter(el => !el.checked) }))}>Del completed</button>
      {this.state.value}
      <ol>
        {this.state.todos.map(todo => <li key={todo.id}>
          <input type='checkbox' checked={todo.checked} onChange={() => this.setState(
            prev => {
              const
                index = prev.todos.findIndex(el => todo.id === el.id);
              return { todos: prev.todos.with(index, cloneElementAndToggleChecked(prev.todos[index])) }
            }
          )} />

          {todo.text}
          <button onClick={() => this.setState(prev => ({ todos: prev.todos.filter(el => el.id !== todo.id) }))}>
            del
          </button>
          {todo.checked && '✅'}
        </li>)}
      </ol>
    </>;
  }
}

function newElement(text) {
  return { checked: false, text, id: Math.random() };
}

function cloneElementAndToggleChecked(element) {
  // return Object.assign({}, element, { checked: !element.checked })
  return { ...element, checked: !element.checked };
}

