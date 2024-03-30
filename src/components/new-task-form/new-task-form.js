import React, { Component } from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      min: '',
      sec: '',
    };
  }

  /* Функция ввода текста в input */
  onLabelChange = (event) => {
    this.setState({
      label: event.target.value, // записываем в state
    });
  };
  onMinChange = (event) => {
    let newMin = event.target.value;
    if (Number(newMin) || newMin === '') {
      this.setState({
        min: newMin, // записываем в state
      });
    }
  };
  onSecChange = (event) => {
    let newSec = event.target.value;
    if (Number(newSec) || newSec === '') {
      this.setState({
        sec: newSec, // записываем в state
      });
    }
  };

  /* Функция отправки формы */
  onSubmit = (event) => {
    const { label, min, sec } = this.state;
    event.preventDefault();

    if (this.state.label) {
      this.props.onTaskAdded(label, min, sec);
      this.setState({
        label: '',
        min: '',
        sec: '',
      });
    }
  };

  render() {
    return (
      <header className="header">
        <h1>задачи</h1>
        <form onSubmit={this.onSubmit} className="new-todo-form">
          <input
            className="new-todo"
            value={this.state.label}
            placeholder="Введите новую задачу"
            onChange={this.onLabelChange}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            value={this.state.min}
            onChange={this.onMinChange}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            value={this.state.sec}
            onChange={this.onSecChange}
          />
          <button type="submit"></button>
        </form>
      </header>
    );
  }
}

NewTaskForm.defaultProps = {
  onTaskAdded: () => {},
};

NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func,
};
