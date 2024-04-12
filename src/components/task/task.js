import React, { useState, useEffect } from 'react';
import './task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

//let disableTime = 0;
//let timerId = 0;

function Task(props) {
  let { label, startTime, onDeleted, onToggleDone, done, sec, min, onTimerUpdate, onDisableTime, disableTime } = props;

  const [timeState, setTimeState] = useState({
    sec: sec,
    min: min,
  });

  const [timerRun, setTimerRun] = useState(false);
  const [timerId, setTimerId] = useState(0);

  //Вместо componentDidMount
  useEffect(() => {
    if (disableTime) {
      savedSecondsTransform(disableTime);
      onStart();
    }
  }, []);

  const savedSecondsTransform = (disableTime) => {
    if (disableTime) {
      setTimeState(({ min, sec }) => {
        let disSeconds = Math.round((Date.now() - disableTime) / 1000);
        let disMinute = 0;

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
    if (timerRun && !timerId) {
      setTimerId(() => setInterval(timerTick, 1000));
    }

    if (!timerRun && timerId) {
      clearInterval(timerId);
      setTimerId(0);
    }
  }, [timerRun]);

  //Отправили время из стэйта таймера в APP
  useEffect(() => {
    onTimerUpdate(timeState.min, timeState.sec);
  }, [timeState]);

  // Вместо componentWillUnmount
  useEffect(() => {
    return () => {
      if (timerRun) {
        //disableTime = Date.now();
        onDisableTime(Date.now());
      } else {
        onDisableTime(0);
      }
    };
  }, [timerRun]);

  const timerTick = () => {
    setTimeState(({ sec, min }) => {
      if (sec === 0 && min === 0) {
        onStop();
        return;
      }
      sec--;

      if (sec < 0) {
        min--;
        sec = 59;
      }

      return {
        sec: sec,
        min: min,
      };
    });
  };

  const onStart = () => setTimerRun(() => true);

  const onStop = () => setTimerRun(() => false);

  //дальше содержимое render
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
            <button className="icon icon-play" onClick={onStart}></button>
            <button className="icon icon-pause" onClick={onStop}></button>
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
