import React from 'react';
import './task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

function Task(props) {
  // Дестректурируем из Props переменные
  const { label, startTime, onDeleted, onToggleDone, done } = props;

  let liClass = '';
  let chek = '';

  if (done) {
    liClass += 'completed';
    chek += 'checked';
  }

  let time = ' ' + formatDistanceToNow(startTime);
  setInterval(() => {
    time = ' ' + formatDistanceToNow(Date.now() - startTime.getTime() / 1000);
  }, 1000);

  return (
    <li className={liClass}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleDone} checked={chek} readOnly />
        <label>
          <span className="description"> {label} </span>
          <span className="created">
            {' '}
            created
            {time} ago
          </span>
        </label>
        <button className="icon icon-edit" />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
    </li>
  );
}

Task.defaultProps = {
  label: 'new task',
  startTime: new Date(),
  onDeleted: () => {},
  onToggleDone: () => {},
  done: false,
  visible: true,
};

Task.propTypes = {
  label: PropTypes.string,
  startTime: PropTypes.object,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  done: PropTypes.bool,
  visible: PropTypes.bool,
};

export default Task;
