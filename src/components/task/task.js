import React, { useState, useEffect } from 'react';
import './task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

let disableTime = 0;
let timerId = 0;

function Task(props) {
  const [timeState, setTimeState] = useState({
    sec: props.sec,
    min: props.min,
  });

  //Вместо componentDidMount
  /* useEffect(() => {
    if (props.timerRun && !timerId) {
      savedSecondsTransform();
      timerId = setInterval(timerTick, 1000);
    }
  }, []);*/

  const savedSecondsTransform = () => {
    const { disableTime } = props;
    if (disableTime) {
      setTimeState(({ min, sec }) => {
        let disSeconds = Math.round((Date.now() - disableTime) / 1000);
        let disMinute = 0;
        console.log('Время отсутствия', disSeconds);
        if (disSeconds > 60) {
          disMinute = Math.floor(disSeconds / 60);
          disSeconds = disSeconds - 60 * disMinute;
        }

        let newSec = sec - disSeconds;
        let newMin = min - disMinute;

        if (disSeconds > sec) {
          newSec = 60 + sec - disSeconds;
          newMin--;
        }

        if (disMinute > min) {
          newMin = 0;
          newSec = 0;
        }

        return {
          sec: newSec,
          min: newMin,
        };
      });
    }
  };

  //Вместо componentDidUpdate
  useEffect(() => {
    savedSecondsTransform();

    if (props.timerRun && !timerId) {
      console.log('Включили таймер', props);
      timerId = setInterval(timerTick, 1000);
    }

    if (!props.timerRun && timerId) {
      console.log('Стоп');
      clearInterval(timerId);
      timerId = 0;
    }
  });

  // Вместо componentWillUnmount
  useEffect(() => {
    return () => {
      disableTime = 0;
      console.log('Выключили');
      setTimeState(({ min, sec }) => {
        if (props.timerRun) {
          disableTime = Date.now(); // запоминаем текущий таймстамп
          console.log('запомнили время выключения');
        }
        props.onTimerUpdate(min, sec, disableTime); //Отправляем в APP

        return {
          sec: sec,
          min: min,
        };
      });

      clearInterval(timerId);
      timerId = 0;
    };
  }, []);

  const timerTick = () => {
    let { sec, min } = props;

    if (sec === 0 && min === 0) {
      setTimeState({
        sec: 0,
        min: 0,
      });
      props.onTimerStop();
      return;
    }

    setTimeState((prevTimeState) => {
      let { sec, min } = prevTimeState;
      if (sec === 0 && min === 0) {
        props.onTimerStop();
        return;
      }
      sec--;

      if (sec < 0) {
        min--;
        sec = 59;
      }

      props.onTimerUpdate(min, sec, disableTime);

      return {
        sec: sec,
        min: min,
      };
    });
  };

  //дальше содержимое render
  // Дестректурируем из Props переменные
  let { label, startTime, onDeleted, onToggleDone, done, onTimerStart, onTimerStop } = props;
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

  const secZero = timeState.sec < 10 ? 0 : '';
  const minZero = timeState.min < 10 ? 0 : '';

  return (
    <li className={liClass}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleDone} checked={chek} readOnly />
        <label>
          <span className="title"> {label} </span>
          <span className="description">
            <button className="icon icon-play" onClick={onTimerStart}></button>
            <button className="icon icon-pause" onClick={onTimerStop}></button>
            {` ${minZero}${timeState.min}:${secZero}${timeState.sec}`}
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
