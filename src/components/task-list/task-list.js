import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';

import './task-list.css';

function TaskList({ todos, onDeleted, onToggleDone, onTimerStart, onTimerStop, onTimerUpdate }) {
  const elements = todos.map((elem) => {
    const { id, ...itemProps } = elem; // дестриктурируем id, ...itemProps

    return (
      <Task
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => {
          onToggleDone(id);
        }}
        onTimerStart={() => onTimerStart(id)}
        onTimerStop={() => onTimerStop(id)}
        onTimerUpdate={(min, sec, disableTime) => onTimerUpdate(id, min, sec, disableTime)}
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
