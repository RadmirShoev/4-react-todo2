import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import './app.css';

import Footer from '../footer/footer';
import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';

// Объект с состояниями Фильтра All, Active, Completed
let filters = {
  all: 'selected',
  active: '',
  completed: '',
};

function App() {
  //Состояния ФИЛЬТР И МАССИВ С ЗАДАЧАМИ
  let [todoData, setTodoData] = useState([createTask('Выпить чай')]);
  let [filter, setFilter] = useState('all');

  const filterTasks = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'completed':
        return items.filter((item) => item.done);
      case 'active':
        return items.filter((item) => !item.done);
      default:
        return items;
    }
  };

  // удалить задачу из списка
  const deleteTask = (id) => {
    setTodoData((todoData) => {
      /* Вычисляем Индекс элемента который нужно удалить по id */
      const idx = todoData.findIndex((el) => el.id === id);

      const before = todoData.slice(0, idx); // часть массива до удаляемого элемента
      const after = todoData.slice(idx + 1); // часть массива после удаляемого элемента

      const newArr = [...before, ...after]; // новый массив без удаленного элемента

      return newArr; // устанавливаем новый массив, без удаленного элемента
    });
  };

  // Добавить новую задачу
  const addTask = (text, min = 0, sec = 0) => {
    // создаем новую задачу с уникальным ID
    const newTask = createTask(text, min, sec);
    if (newTask.min === '') {
      newTask.min = 0;
    }
    if (newTask.sec === '') {
      newTask.sec = 0;
    }
    // добавляем новую задачу в todoData
    setTodoData((todoData) => {
      const newArr = [...todoData, newTask];

      return newArr;
    });
  };

  // Переключение Выполнена/Невыполнена ЗАДАЧА
  const onToggleDone = (id) => {
    setTodoData((todoData) => {
      /* Вычисляем Индекс элемента который нужно удалить по id */
      const idx = todoData.findIndex((el) => el.id === id);

      // 1 Обновляем объект задачи по id
      const oldTask = todoData[idx];

      const newTask = {
        ...oldTask, // копируем весь объект
        done: !oldTask.done,
        timerRun: false,
      }; // заменяем свойство на противоположное !oldTask.done

      // 2 обновляем массив со всеми задачами
      const newArray = [...todoData];
      newArray[idx] = newTask;

      return newArray; // возвращаем изменненый массив задач
    });
  };

  //Функция обновления времени таймера в задаче
  const timerUpdate = (id, min, sec, disableTime = 0) => {
    setTodoData((todoData) => {
      /* Вычисляем Индекс элемента который нужно удалить по id */
      const idx = todoData.findIndex((el) => el.id === id);

      // 1 Обновляем объект задачи по id
      const oldTask = todoData[idx];

      const newTask = {
        ...oldTask, // копируем весь объект
        min: min,
        sec: sec,
        disableTime: disableTime,
      };

      // 2 обновляем массив со всеми задачами
      const newArray = [...todoData];
      newArray[idx] = newTask;

      return newArray;
    });
  };
  //сохранение времени отсутствия
  const onDisableTime = (id, disableTime = 0) => {
    setTodoData((todoData) => {
      /* Вычисляем Индекс элемента который нужно удалить по id */
      const idx = todoData.findIndex((el) => el.id === id);

      // 1 Обновляем объект задачи по id
      const oldTask = todoData[idx];

      const newTask = {
        ...oldTask, // копируем весь объект
        disableTime: disableTime,
      };

      // 2 обновляем массив со всеми задачами
      const newArray = [...todoData];
      newArray[idx] = newTask;

      return newArray;
    });
  };
  // Удаление всех завершенных задач
  const deleteAllDone = () => {
    setTodoData((todoData) => {
      const newArr = todoData.filter((el) => el.done === false);

      return newArr;
    });
  };

  // ФИЛЬТР Все задачи
  const selectAll = () => {
    setFilter('all');
    filters = {
      all: 'selected',
      active: '',
      completed: '',
    };
  };

  // ФИЛЬТР только активные задачи
  const selectActive = () => {
    setFilter('active');
    filters = {
      all: '',
      active: 'selected',
      completed: '',
    };
  };

  // ФИЛЬТР только завершенные задачи
  const selectCompleted = () => {
    setFilter('completed');
    filters = {
      all: '',
      active: '',
      completed: 'selected',
    };
  };

  // Функция создания элемента списка
  function createTask(label, min = 5, sec = 0) {
    return {
      label: label,
      done: false,
      id: nanoid(),
      startTime: new Date(),
      min: min,
      sec: sec,
      timerRun: false,
      disableTime: 0,
    };
  }

  const tacks = filterTasks(todoData, filter); // массив с задачами
  const taskCount = todoData.length - todoData.filter((el) => el.done).length; // незавершенные задачи

  return (
    <section className="todoapp">
      <NewTaskForm onTaskAdded={addTask} />
      <section className="main">
        <TaskList
          todos={tacks}
          onDeleted={deleteTask}
          onToggleDone={onToggleDone}
          onTimerUpdate={timerUpdate}
          onDisableTime={onDisableTime}
        />
        <Footer
          taskCount={taskCount}
          onDeleteAllDone={deleteAllDone}
          onSelectAll={selectAll}
          onSelectActive={selectActive}
          onSelectCompleted={selectCompleted}
          filters={filters}
        />
      </section>
    </section>
  );
}

export default App;
