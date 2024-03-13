import React, { Component } from 'react';
import './app.css';

import Footer from '../footer/footer.js';
import NewTaskForm from '../new-task-form/new-task-form.js';
import TaskList from '../task-list/task-list.js';

export default class App extends Component {
  // Компонент всего приложения
  maxId = 100;

  state = {
    todoData: [
      this.createTask('Completed task'),
      this.createTask('Editing task'),
      this.createTask('Active task'),
    ],
  };

  // Функция создания элемента списка
  createTask(label) {
    return {
      label,
      done: false,
      visible: true,
      id: this.maxId++,
      startTime: new Date(),
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

  // Объект с состояниями Фильтра All, Active, Completed
  filters = {
    all: 'selected',
    active: '',
    completed: '',
  };

  // ФИЛЬТР Все задачи
  selectAll = () => {
    this.setState(({ todoData }) => {
      const newArr = [...todoData];
      /* Делаем все элементы видимыми */
      for (const elem of newArr) {
        elem.visible = true;
      }

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
      for (const elem of newArr) {
        if (elem.done) {
          // задача выполнена
          elem.visible = false; // сделай ее невидимой
        } else {
          elem.visible = true; // иначе сделай видимой
        }
      }

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
      for (const elem of newArr) {
        if (!elem.done) {
          // если Задача Активна
          elem.visible = false; // сделай ее невидимой
        } else {
          elem.visible = true; // иначе сделай видимой
        }
      }

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

  render() {
    const tacks = this.state.todoData; // массив с задачами
    const taskCount = tacks.length - tacks.filter((el) => el.done).length; // незавершенные задачи

    return (
      <section className="todoapp">
        <NewTaskForm onTaskAdded={this.addTask} />
        <section className="main">
          <TaskList
            todos={this.state.todoData}
            onDeleted={this.deleteTask}
            onToggleDone={this.onToggleDone}
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
