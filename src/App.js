
import './App.css';
import Header from './components/Header'
import { Card } from 'antd';
import List from './components/List';
function App () {
  return (
    <div className="todo-container">
      <div className="todo-wrap">
        <Card>
          <Header />
        </Card>
        <List />
      </div>
    </div>
  );
}

export default App;
