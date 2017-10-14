import React from 'react';
import {TransitionMotion, spring, presets} from 'react-motion';
import './App.css';

export default class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [
        // key is creation date
        {key: 't1', data: {text: 'Board the plane', isDone: false}},
        {key: 't2', data: {text: 'Sleep', isDone: false}},
        {key: 't3', data: {text: 'Try to finish conference slides', isDone: false}},
        {key: 't5', data: {text: 'Go around in Uber', isDone: false}},
      ],
      value: '',
      selected: 'all',
    };
  };

  // logic from todo, unrelated to animation
  handleChange = ({target: {value}}) => {
    this.setState({value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      key: 't' + Date.now(),
      data: {text: this.state.value, isDone: false},
    };
    // append at head
    this.setState({todos: [newItem].concat(this.state.todos)});
  };

  handleDone = (doneKey) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        const {key, data: {text, isDone}} = todo;
        return key === doneKey
          ? {key: key, data: {text: text, isDone: !isDone}}
          : todo;
      }),
    });
  };

  handleToggleAll = () => {
    const allNotDone = this.state.todos.every(({data}) => data.isDone);
    this.setState({
      todos: this.state.todos.map(({key, data: {text, isDone}}) => (
        {key: key, data: {text: text, isDone: !allNotDone}}
      )),
    });
  };

  handleSelect = (selected) => {
    this.setState({selected});
  };

  handleClearCompleted = () => {
    this.setState({todos: this.state.todos.filter(({data}) => !data.isDone)});
  };

  handleDestroy = (date) => {
    this.setState({todos: this.state.todos.filter(({key}) => key !== date)});
  };

  // actual animation-related logic
  getDefaultStyles = () => {
    return this.state.todos.map(todo => ({...todo, style: {height: 0, opacity: 1}}));
  };

  getStyles = () => {
    const {todos, value, selected} = this.state;
    return todos.filter(({data: {isDone, text}}) => {
      return text.toUpperCase().indexOf(value.toUpperCase()) >= 0 &&
        (selected === 'completed' && isDone ||
        selected === 'active' && !isDone ||
        selected === 'all');
    })
    .map((todo, i) => {
      return {
        ...todo,
        style: {
          height: spring(60, presets.gentle),
          opacity: spring(1, presets.gentle),
        }
      };
    });
  };

  willEnter() {
    return {
      height: 0,
      opacity: 1,
    };
  };

  willLeave() {
    return {
      height: spring(0),
      opacity: spring(0),
    };
  };

  render() {
    const {todos, value, selected} = this.state;
    const itemsLeft = todos.filter(({data: {isDone}}) => !isDone).length;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              autoFocus={true}
              className="new-todo"
              placeholder="What needs to be done?"
              value={value}
              onChange={this.handleChange}
            />
          </form>
        </header>
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            checked={itemsLeft === 0} style={{display: todos.length === 0 ? 'none' : 'inline'}}
            onChange={this.handleToggleAll} />
          <TransitionMotion
            defaultStyles={this.getDefaultStyles()}
            styles={this.getStyles()}
            willLeave={this.willLeave}
            willEnter={this.willEnter}>
            {styles =>
              <ul className="todo-list">
                {styles.map(({key, style, data: {isDone, text}}) =>
                  <li key={key} style={style} className={isDone ? 'completed' : ''}>
                    <div className="view">
                      <input
                        className="toggle"
                        type="checkbox"
                        onChange={this.handleDone.bind(null, key)}
                        checked={isDone}
                      />
                      <label>{text}</label>
                      <button
                        className="destroy"
                        onClick={this.handleDestroy.bind(null, key)}
                      />
                    </div>
                  </li>
                )}
              </ul>
            }
          </TransitionMotion>
        </section>
      </section>
    );
  };
}