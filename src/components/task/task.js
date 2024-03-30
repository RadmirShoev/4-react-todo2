import React, { Component } from 'react';
import './task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min: props.min,
      sec: props.sec,
    };
  }

  componentDidMount() {
    if (this.props.timerRun) {
      this.savedSecondsTransform();
    }
  }

  savedSecondsTransform() {
    const { min, sec, disableTime } = this.props;
    this.disableTime = 0;

    //Проверяем время отсутсвия компонена (вне рендера)
    let disSeconds = 0;
    let disMinute = 0;

    if (disableTime) {
      disSeconds = Math.round((Date.now() - disableTime) / 1000);
    }

    if (disSeconds > 60) {
      disMinute = Math.floor(disSeconds / 60);
      disSeconds = disSeconds - 60 * disMinute;
    }
    let newSec = sec + disSeconds;
    let newMin = min + disMinute;

    if (newSec > 59) {
      newMin++;
      newSec = newSec - 60;
    }

    this.setState(() => {
      return {
        sec: newSec,
        min: newMin,
      };
    });
  }

  componentDidUpdate() {
    if (this.props.timerRun && !this.timerId) {
      this.timerId = setInterval(this.timerTick, 1000);
    }

    if (!this.props.timerRun && this.timerId) {
      clearInterval(this.timerId);
      this.timerId = 0;
    }
  }

  componentWillUnmount() {
    let { sec, min } = this.state;
    this.disableTime = Date.now(); // запоминаем текущий таймстамп

    this.props.onTimerUpdate(min, sec, this.disableTime); //Отправляем в APP
  }

  timerTick = () => {
    let { sec, min } = this.state;
    sec++;

    if (sec > 59) {
      min++;
      sec = 0;
    }
    this.setState(() => {
      return {
        min: min,
        sec: sec,
      };
    });
    this.props.onTimerUpdate(min, sec, this.disableTime);
  };

  render() {
    // Дестректурируем из Props переменные
    let { label, startTime, onDeleted, onToggleDone, done, onTimerStart, onTimerStop } = this.props;
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

    const secZero = this.state.sec < 10 ? 0 : '';
    const minZero = this.state.min < 10 ? 0 : '';

    return (
      <li className={liClass}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone} checked={chek} readOnly />
          <label>
            <span className="title"> {label} </span>
            <span className="description">
              <button className="icon icon-play" onClick={onTimerStart}></button>
              <button className="icon icon-pause" onClick={onTimerStop}></button>
              {` ${minZero}${this.state.min}:${secZero}${this.state.sec}`}
            </span>
            <span className="description">
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
