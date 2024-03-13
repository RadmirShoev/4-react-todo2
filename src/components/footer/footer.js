import React from 'react';
import './footer.css';
import PropTypes from 'prop-types';
import TasksFilter from '../tasks-filter/tasks-filter';

function Footer({
  taskCount,
  onDeleteAllDone,
  onSelectAll,
  onSelectActive,
  onSelectCompleted,
  filters,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">{taskCount} tasks left</span>
      <TasksFilter
        onSelectAll={() => onSelectAll()}
        onSelectActive={() => onSelectActive()}
        onSelectCompleted={() => onSelectCompleted()}
        filters={filters}
      />
      <button className="clear-completed" onClick={onDeleteAllDone}>
        Clear completed
      </button>
    </footer>
  );
}
Footer.defaultProps = {
  taskCount: 0,
  onDeleteAllDone: () => {},
  onSelectAll: () => {},
  onSelectActive: () => {},
  onSelectCompleted: () => {},
  filters: {
    all: 'selected',
    active: '',
    completed: '',
  },
};
Footer.propTypes = {
  taskCount: PropTypes.number,
  onDeleteAllDone: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectActive: PropTypes.func,
  onSelectCompleted: PropTypes.func,
  filters: PropTypes.object,
};
export default Footer;
