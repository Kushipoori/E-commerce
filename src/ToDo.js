import React, { Component } from 'react';
import { Formik } from 'formik';
import './style.css';

class ToDo extends Component {
    state={
      todoList: [],
      filtertype: 'all',
    }

    onAddtodo = (values, action) => {
      this.setState(({ todoList }) => ({
        todoList: [...todoList, {
          text: values.todoText,
          id: new Date().valueOf(),
          isDone: false,
        }],
      }), () => { action.resetForm(); });
    }

    onCompleteToDo = (item) => {
      this.setState(({ todoList: list }) => ({
        todoList: list.map((x) => {
          if (x.id === item.id) { return { ...x, isDone: !x.isDone }; }
          return x;
        }),
      }));
    }

    onDeleteToDo = (item) => {
      this.setState(({ todoList: list }) => ({
        todoList: list.filter((x) => x.id !== item.id),
      }));
    }

    filterToDo = (type) => {
      this.setState({
        filtertype: type,
      });
    }

    render() {
      const { todoList, filtertype } = this.state;
      return (
        <div className="container">
          <h1 className="title">ToDo list</h1>
          <Formik
            initialValues={{ todoText: '' }}
            onSubmit={this.onAddtodo}
            validate={(values) => {
              const errors = {};
              if (!values.todoText) errors.todoText = 'Required...';
              return errors;
            }}
          >
            {({
              values, handleChange, handleSubmit, errors,
            }) => (

              <form className="input-form" onSubmit={handleSubmit}>
                <div>
                  <input type="text" style={{ borderColor: errors.todoText ? 'red' : 'gray' }} onChange={handleChange} value={values.todoText} name="todoText" className="todo-item" placeholder="Enter your list" />
                  <button type="submit">Add todo</button>
                </div>
                {errors.todoText && <div style={{ color: 'red' }}>{errors.todoText}</div>}
              </form>

            )}

          </Formik>
          <div className="todoListItems">
            {
                    todoList.filter((item) => {
                      switch (filtertype) {
                        case 'pending':
                          return !item.isDone;
                        case 'complete':
                          return item.isDone;
                        default:
                          return true;
                      }
                    }).map((item) => (
                      <div className="todoItem" key={item.id}>
                        <input
                          type="checkbox"
                          name="isDone"
                          id="isDone"
                          checked={item.isDone}
                          onChange={() => { this.onCompleteToDo(item); }}
                        />

                        <span>{item.text}</span>
                        <button
                          type="button"
                          onClick={() => {
                            this.onDeleteToDo(item);
                          }}
                        >
                          delete task

                        </button>

                      </div>
                    ))
                }

          </div>
          <div className="My-filter-buttons">
            <button type="button" onClick={() => { this.filterToDo('all'); }}>All</button>
            <button type="button" onClick={() => { this.filterToDo('pending'); }}>Pending</button>
            <button type="button" onClick={() => { this.filterToDo('complete'); }}>Completed</button>

          </div>
        </div>
      );
    }
}

export default ToDo;
