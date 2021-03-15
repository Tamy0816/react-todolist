import PubSub from 'pubsub-js';
import { Input, Button } from 'antd';
import React, { Component } from 'react'
var _ = require('lodash');
export default class index extends Component {
  render () {
    return (
      <div className="header">
        <Input ref={inputEl => this.inputEl = inputEl} onKeyUp={this.keyUp} style={{ width: "85%" }} placeholder="添加todo" />
        <Button type="primary" onClick={this.addTodo} style={{ width: "15%" }} >添加</Button>
      </div>
    )
  }
  // input 回车添加todo
  keyUp = event => {
    if (event.keyCode === 13) {
      // inputEl ref绑定的DOM元素
      if (this.inputEl.input.value.trim() === '') alert('不能为空！')
      else {
        PubSub.publish('AddTodo', { id: _.uniqueId("prefix-"), name: this.inputEl.input.value, done: false })
        // 添加完input置空
        this.inputEl.input.value = '';
        this.inputEl.state.value = '';
      }
    }
  }
  // 点击按钮添加todo
  addTodo = (e) => {
    if (this.inputEl.input.value.trim() === '') alert('不能为空！')
    else {
      // 发布事件AddTodo
      PubSub.publish('AddTodo', { id: _.uniqueId("prefix-"), name: this.inputEl.input.value, done: false })
      this.inputEl.input.value = '';
      this.inputEl.state.value = '';
    }
  }
}

