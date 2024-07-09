// TodoList.js
import React, { useState } from 'react';
import { List, Input, Button, Modal } from 'antd';
import 'antd/dist/antd.css'; // Import Ant Design CSS
import TodoItem from './TodoItem';

const { confirm } = Modal;

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [visible, setVisible] = useState(false);

  const showModal = (index) => {
    setEditIndex(index);
    setInputValue(tasks[index].text);
    setVisible(true);
  };

  const handleOk = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editIndex].text = inputValue;
    setTasks(updatedTasks);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const addTask = () => {
    if (!inputValue.trim()) {
      return;
    }
    const newTask = { text: inputValue };
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const deleteTask = (index) => {
    confirm({
      title: 'Are you sure you want to delete this task?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        const updatedTasks = tasks.filter((_, idx) => idx !== index);
        setTasks(updatedTasks);
      },
    });
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <Input
        placeholder="Enter task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ width: '300px', marginRight: '10px' }}
      />
      <Button type="primary" onClick={addTask}>
        Add Task
      </Button>
      <List
        style={{ marginTop: '20px', width: '300px' }}
        bordered
        dataSource={tasks}
        renderItem={(item, index) => (
          <TodoItem
            key={index}
            item={item}
            index={index}
            showModal={showModal}
            deleteTask={deleteTask}
          />
        )}
      />
      <Modal
        title="Edit Task"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Edit task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default TodoList;
