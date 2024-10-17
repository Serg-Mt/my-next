import { Component, PureComponent, useEffect, useState, memo } from 'react';


export function EffectsStand() {
  const
    [checked, setChecked] = useState(true),
    [childProp, setChildProp] = useState(55),
    [value, setValue] = useState('-value-');
  return <fieldset>
    <legend>Parent</legend>
    <input value={value} onInput={event => setValue(event.target.value)} /><br />
    <button onClick={() => setChildProp(prev => 1 + prev)}>{childProp}</button><br />
    <input type="checkbox" checked={checked} onChange={() => setChecked(prev => !prev)} />
    {checked && <ChildFunctionalStyle prop1={childProp} />}
  </fieldset>;
}



class ChildClassStyle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { state1: 100 };
    console.debug('constructor');
  }
  render() {
    console.debug('render', this.state.state1, this.props.prop1);
    return <fieldset>
      <legend>Child Class-style</legend>
      Props = {this.props.prop1}<br />
      State =
      <input
        onInput={event => this.setState({ state1: +event.target.value })}
        type="number"
        value={this.state.state1}
      />  ({this.state.state1})
    </fieldset>;
  }
  componentDidMount() {
    console.debug('componentDidMount');
  }
  componentDidUpdate() {
    console.log('componentDidUpdate');
  }
  componentWillUnmount() {
    console.debug('componentWillUnmount')
  }
}

const
  ChildFunctionalStyle = memo(function ({ prop1 }) {
    const
      [state1, setState1] = useState(100);
    console.debug('render', state1, prop1);

    useEffect(() => console.debug('1) Mount + Update'));
    useEffect(() => console.debug('2) Mount'), []);
    useEffect(() => console.debug('3) Mount + state1 '), [state1]);
    useEffect(() => console.debug('4) Mount + prop1 '), [prop1]);
    useEffect(() => () => console.debug('5) Unmount'), []);
    return <fieldset>
      <legend>Child Functional-style</legend>
      Props = {prop1}<br />
      State =
      <input
        onInput={event => setState1(+event.target.value)}
        type="number"
        value={state1}
      />  ({state1})
    </fieldset>;
  });