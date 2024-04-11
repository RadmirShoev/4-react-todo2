import React from 'react';
import './tasks-filter.css';
import PropTypes from 'prop-types';

function TasksFilter(props) {
  // Дестректурируем из Props переменные
  const { onSelectAll, onSelectActive, onSelectCompleted, filters } = props;

  return (
    <ul className="filters">
      <li>
        <button className={filters.all} onClick={onSelectAll}>
          All
        </button>
      </li>
      <li>
        <button className={filters.active} onClick={onSelectActive}>
          Active
        </button>
      </li>
      <li>
        <button className={filters.completed} onClick={onSelectCompleted}>
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.defaultProps = {
  onSelectAll: () => {},
  onSelectActive: () => {},
  onSelectCompleted: () => {},
  filters: {
    all: 'selected',
    active: '',
    completed: '',
  },
};

TasksFilter.propTypes = {
  onSelectAll: PropTypes.func,
  onSelectActive: PropTypes.func,
  onSelectCompleted: PropTypes.func,
  filters: PropTypes.object,
};

export default TasksFilter;
