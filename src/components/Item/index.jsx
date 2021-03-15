import React, { Component } from 'react'
import { Button, Checkbox } from 'antd';

export default class Item extends Component {
  state = { mouse: false, }
  render () {
    return (
      <div style={{ margin: '10px 0', border: '1px solid #ddd', padding: '10px', backgroundColor: this.state.mouse ? '#ddd' : 'white' }} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
        <Checkbox defaultChecked={this.props.done} checked={this.props.done} onChange={this.onChange(this.props.id)}>
          <label style={{ textDecoration: this.props.done ? 'line-through' : 'none' }}> {this.props.name}</label>
        </Checkbox>
        <Button onClick={this.deleteTodo(this.props.id)} type="danger" style={{ position: 'relative', top: '-5px', display: this.state.mouse ? 'block' : 'none', float: 'right' }}>删除</Button>
      </div>
    )
  }
  // 鼠标移入、移出 
  handleMouse = (flag) => {
    return () => {
      this.setState({
        mouse: flag
      })
    }
  }
  // todo 勾选 更新todos
  onChange = id => {
    return (event) => {
      // 传递给父组件
      this.props.updateTodo(id, event.target.checked)
    }
  }
  // 删除todo
  deleteTodo = (id) => {
    return () => {
      if (window.confirm('确认删除？')) {
        // 传递给父组件
        this.props.deleteTodo(id)
      }
    }
  }
}
