import React, { Component } from 'react';
import './tasks-filter.css';

import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  static defaultProps = {
    onSelectAll: () => {},
    onSelectActive: () => {},
    onSelectCompleted: () => {},
    filters: {
      all: 'selected',
      active: '',
      completed: '',
    },
  };

  static propTypes = {
    onSelectAll: PropTypes.func,
    onSelectActive: PropTypes.func,
    onSelectCompleted: PropTypes.func,
    filters: PropTypes.object,
  };

  render() {
    // Дестректурируем из Props переменные
    const { onSelectAll, onSelectActive, onSelectCompleted, filters } = this.props;

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
}
