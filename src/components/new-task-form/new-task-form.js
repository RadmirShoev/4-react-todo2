import React, { Component } from "react";
import "./new-task-form.css";


export default class NewTaskForm extends Component {

  state = {
    label : ''
  };

  /*Функция ввода текста в input */
  onLabelChange = (event) =>{ 
    this.setState({
      label : event.target.value, // записываем в state
    })
  }
  /* Функция отправки формы */
  onSubmit = (event)=> {
    event.preventDefault();

    if(this.state.label){
      this.props.onTaskAdded(this.state.label);
      this.setState({label: ''});
    } 
  }

  render(){

    return (
      <header className ="header">
        <h1>todos</h1>
        <form onSubmit = {this.onSubmit} >
          <input className="new-todo" 
                 value = {this.state.label}
                 placeholder="What needs to be done?"
                 onChange={this.onLabelChange} />
        </form>
      </header>
    );
  };
};

