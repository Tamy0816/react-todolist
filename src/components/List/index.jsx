import React from 'react'
import PubSub from 'pubsub-js'
import Item from '../Item'
import { Card, Checkbox, Button } from 'antd';

export default class List extends React.Component {
  componentDidMount () {
    // PubSub.subscribe()添加订阅 事件，订阅AddTodo
    this.pubsub_token = PubSub.subscribe('AddTodo', (_, message) => {
      this.setState({
        todos: [message, ...this.state.todos]
      })
    })
  }
  componentWillUnmount () {
    // 组件注销时取消订阅
    PubSub.unsubscribe(this.pubsub_token);
  }
  state = {
    todos: [{ id: 0, name: '吃饭', done: false }, { id: 1, name: '喝水', done: false }]
  }
  updateTodo = (id, done) => {
    const { todos } = this.state;
    const newTodos = todos.map((todoObj) => {
      if (todoObj.id === id) return { ...todoObj, done: done }
      else return todoObj
    })
    this.setState({
      todos: newTodos
    })
  }
  deleteTodo = (id) => {
    const { todos } = this.state;
    const newTodos = todos.filter(it => it.id !== id);
    this.setState({
      todos: newTodos
    })
  }
  deleteAll = () => {
    this.setState({
      todos: []
    })
  }
  // 全选或全不选
  onChange = event => {
    const { todos } = this.state;
    if (event.target.checked) {
      const newTodos = todos.map((todo) => {
        todo.done = true;
        return todo
      })
      this.setState({ todos: newTodos })
    } else {
      const newTodos = todos.map((todo) => {
        todo.done = false;
        return todo
      })
      this.setState({ todos: newTodos })
    }
  }
  render () {
    const { todos } = this.state;
    const finishNum = todos.filter(it => it.done).length;
    return (
      <div>
        <Card>
          {todos.map(todo => {
            return <Item key={todo.id} {...todo} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
          })}
        </Card>
        <Card>
          <div>
            <Checkbox onChange={this.onChange} defaultChecked={finishNum === todos.length && todos.length !== 0} checked={finishNum === todos.length && todos.length !== 0}>已完成{finishNum}项/全部{todos.length}项</Checkbox>
            <Button onClick={this.deleteAll} type="danger" style={{ float: 'right' }}>删除全部</Button>
          </div>
        </Card>
      </div>
    )
  }
}
