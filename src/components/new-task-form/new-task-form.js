import React, { useState } from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

function NewTaskForm(props) {
  let [label, setLabel] = useState('');
  let [min, setMin] = useState('');
  let [sec, setSec] = useState('');

  /* Функция ввода текста в input */
  const onLabelChange = (event) => {
    setLabel(() => {
      return event.target.value;
    });
  };

  const onMinChange = (event) => {
    let newMin = event.target.value;
    if (Number(newMin) || newMin === '' || newMin === 0) {
      if (newMin <= 60) {
        setMin(newMin);
      }
    }
  };

  const onSecChange = (event) => {
    let newSec = event.target.value;
    if (Number(newSec) || newSec === '' || newSec === 0) {
      if (newSec <= 60) {
        setSec(newSec);
      }
    }
  };

  /* Функция отправки формы */
  const onSubmit = (event) => {
    event.preventDefault();

    if (label && (min > 0 || sec > 0)) {
      props.onTaskAdded(label, min, sec);
      setLabel('');
      setMin('');
      setSec('');
    }
  };

  return (
    <header className="header">
      <h1>задачи</h1>
      <form onSubmit={onSubmit} className="new-todo-form">
        <input className="new-todo" value={label} placeholder="Введите новую задачу" onChange={onLabelChange} />
        <input className="new-todo-form__timer" placeholder="Min" value={min} onChange={onMinChange} />
        <input className="new-todo-form__timer" placeholder="Sec" value={sec} onChange={onSecChange} />
        <button type="submit"></button>
      </form>
    </header>
  );
}

NewTaskForm.defaultProps = {
  onTaskAdded: () => {},
};

NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func,
};

export default NewTaskForm;
