import React, { Component } from 'react';
import './app.css';

import Footer from '../footer/footer';
import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';

export default class App extends Component {
  // Компонент всего приложения
  maxId = 100;

  // Объект с состояниями Фильтра All, Active, Completed
  filters = {
    all: 'selected',
    active: '',
    completed: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      todoData: [this.createTask('Выпить чай'), this.createTask('Взять ключи'), this.createTask('Купить дом')],
      filter: 'all',
    };
  }

  filterTasks = (items, filter) => {
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
  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      /* Вычисляем Индекс элемента который нужно удалить по id */
      const idx = todoData.findIndex((el) => el.id === id);

      const before = todoData.slice(0, idx); // часть массива до удаляемого элемента
      const after = todoData.slice(idx + 1); // часть массива после удаляемого элемента

      const newArr = [...before, ...after]; // новый массив без удаленного элемента

      return {
        todoData: newArr, // устанавливаем новый массив, без удаленного элемента
      };
    });
  };

  // Добавить новую задачу
  addTask = (text, min = 0, sec = 0) => {
    // создаем новую задачу с уникальным ID
    const newTask = this.createTask(text, min, sec);

    // добавляем новую задачу в todoData
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newTask];

      return { todoData: newArr };
    });
  };

  // Переключение Выполнена/Невыполнена ЗАДАЧА
  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
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

      return {
        todoData: newArray, // возвращаем изменненый массив задач
      };
    });
  };

  //Функция Запуск Таймера
  timerStart = (id) => {
    this.setState(({ todoData }) => {
      /* Вычисляем Индекс элемента который нужно удалить по id */
      const idx = todoData.findIndex((el) => el.id === id);

      // 1 Обновляем объект задачи по id
      const oldTask = todoData[idx];

      const newTask = {
        ...oldTask, // копируем весь объект
        timerRun: true,
      };
      console.log(newTask);
      // 2 обновляем массив со всеми задачами
      const newArray = [...todoData];
      newArray[idx] = newTask;

      return {
        todoData: newArray, // возвращаем изменненый массив задач
      };
    });
  };

  timerStop = (id) => {
    this.setState(({ todoData }) => {
      /* Вычисляем Индекс элемента который нужно удалить по id */
      const idx = todoData.findIndex((el) => el.id === id);

      // 1 Обновляем объект задачи по id
      const oldTask = todoData[idx];

      const newTask = {
        ...oldTask, // копируем весь объект
        timerRun: false,
      };

      // 2 обновляем массив со всеми задачами
      const newArray = [...todoData];
      newArray[idx] = newTask;

      return {
        todoData: newArray, // возвращаем изменненый массив задач
      };
    });
  };

  //Функция обновления времени таймера в задаче
  timerUpdate = (id, min, sec) => {
    this.setState(({ todoData }) => {
      /* Вычисляем Индекс элемента который нужно удалить по id */
      const idx = todoData.findIndex((el) => el.id === id);

      // 1 Обновляем объект задачи по id
      const oldTask = todoData[idx];

      const newTask = {
        ...oldTask, // копируем весь объект
        min: min,
        sec: sec,
      };
      console.log(newTask);
      // 2 обновляем массив со всеми задачами
      const newArray = [...todoData];
      newArray[idx] = newTask;

      return {
        todoData: newArray, // возвращаем изменненый массив задач
      };
    });
  };

  // Удаление всех завершенных задач
  deleteAllDone = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((el) => el.done === false);

      return {
        todoData: newArr,
      };
    });
  };

  // ФИЛЬТР Все задачи
  selectAll = () => {
    this.setState({ filter: 'all' });
    this.filters = {
      all: 'selected',
      active: '',
      completed: '',
    };
  };

  // ФИЛЬТР только активные задачи
  selectActive = () => {
    this.setState({ filter: 'active' });
    this.filters = {
      all: '',
      active: 'selected',
      completed: '',
    };
  };

  // ФИЛЬТР только завершенные задачи
  selectCompleted = () => {
    this.setState({ filter: 'completed' });
    this.filters = {
      all: '',
      active: '',
      completed: 'selected',
    };
  };

  // Функция создания элемента списка
  createTask(label, min = 0, sec = 0) {
    return {
      label: label,
      done: false,
      id: this.maxId++,
      startTime: new Date(),
      min: min,
      sec: sec,
      timerRun: false,
    };
  }

  render() {
    const { todoData, filter } = this.state;
    const tacks = this.filterTasks(todoData, filter); // массив с задачами
    const taskCount = todoData.length - todoData.filter((el) => el.done).length; // незавершенные задачи

    return (
      <section className="todoapp">
        <NewTaskForm onTaskAdded={this.addTask} />
        <section className="main">
          <TaskList
            todos={tacks}
            onDeleted={this.deleteTask}
            onToggleDone={this.onToggleDone}
            onTimerStart={this.timerStart}
            onTimerStop={this.timerStop}
            onTimerUpdate={this.timerUpdate}
          />
          <Footer
            taskCount={taskCount}
            onDeleteAllDone={this.deleteAllDone}
            onSelectAll={this.selectAll}
            onSelectActive={this.selectActive}
            onSelectCompleted={this.selectCompleted}
            filters={this.filters}
          />
        </section>
      </section>
    );
  }
}
