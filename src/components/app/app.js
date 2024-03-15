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
      todoData: [this.createTask('Completed task'), this.createTask('Editing task'), this.createTask('Active task')],
    };
  }

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
  addTask = (text) => {
    // создаем новую задачу с уникальным ID
    const newTask = this.createTask(text);

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

      // 1 Овновляем объект задачи по id
      const oldTask = todoData[idx];

      const newTask = {
        ...oldTask, // копируем весь объект
        done: !oldTask.done,
      }; // заменяем свойство на противоположное !oldTask.done

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
    this.setState(({ todoData }) => {
      const newArr = [...todoData];
      /* Делаем все элементы видимыми */
      newArr.forEach((elem) => (elem.visible = true));

      this.filters = {
        all: 'selected',
        active: '',
        completed: '',
      };

      return {
        todoData: newArr, // возвращаем изменненый массив задач
      };
    });
  };

  // ФИЛЬТР только активные задачи
  selectActive = () => {
    this.setState(({ todoData }) => {
      const newArr = [...todoData];
      /* Скрываем завершенные задачи */
      newArr.forEach((elem) => {
        if (elem.done) {
          // задача выполнена
          elem.visible = false; // сделай ее невидимой
        } else {
          elem.visible = true; // иначе сделай видимой
        }
      });

      this.filters = {
        all: '',
        active: 'selected',
        completed: '',
      };

      return {
        todoData: newArr, // возвращаем изменненый массив задач
      };
    });
  };

  // ФИЛЬТР только завершенные задачи
  selectCompleted = () => {
    this.setState(({ todoData }) => {
      const newArr = [...todoData];
      /* Скрываем активные задачи */
      newArr.forEach((elem) => {
        if (!elem.done) {
          // задача выполнена
          elem.visible = false; // сделай ее невидимой
        } else {
          elem.visible = true; // иначе сделай видимой
        }
      });

      this.filters = {
        all: '',
        active: '',
        completed: 'selected',
      };

      return {
        todoData: newArr, // возвращаем изменненый массив задач
      };
    });
  };

  // Функция создания элемента списка
  createTask(label) {
    return {
      label: label,
      done: false,
      visible: true,
      id: this.maxId++,
      startTime: new Date(),
    };
  }

  render() {
    const { todoData: tacks } = this.state; // массив с задачами
    const taskCount = tacks.length - tacks.filter((el) => el.done).length; // незавершенные задачи

    return (
      <section className="todoapp">
        <NewTaskForm onTaskAdded={this.addTask} />
        <section className="main">
          <TaskList todos={tacks} onDeleted={this.deleteTask} onToggleDone={this.onToggleDone} />
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
