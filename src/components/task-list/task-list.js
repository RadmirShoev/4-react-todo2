import React from 'react';
import Task from '../task/task';
import './task-list.css';
import PropTypes from 'prop-types';

function TaskList({ todos, onDeleted, onToggleDone }) {
  const elements = todos.map((elem) => {
    const { id, ...itemProps } = elem; // дестриктурируем id, ...itemProps

    return (
      <Task
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => {
          onToggleDone(id);
        }}
        key={id}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
};

TaskList.propTypes = {
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
};

export default TaskList;
