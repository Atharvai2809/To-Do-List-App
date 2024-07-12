import React, { useState } from 'react';
import { List, Input, Button, Modal, Form, Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'; // Import Ant Design CSS
import TodoItem from './TodoItem';

const { confirm } = Modal;

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of tasks per page

  const showModal = (index) => {
    setEditIndex(index);
    setInputValue(tasks[index].text);
    setIsModalOpen(true);
    form.setFieldsValue({ task: tasks[index].text });
  };

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex].text = values.task;
        setTasks(updatedTasks);
        setIsModalOpen(false);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const addTask = () => {
    form.validateFields()
      .then(values => {
        const newTask = { text: values.task, completed: false };
        setTasks([...tasks, newTask]);
        setInputValue('');
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
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

  const toggleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const renderTasks = tasks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>To Do List</h1>
      <Form form={form} layout="inline">
        <Form.Item
          name="task"
          rules={[{ required: true, message: 'Please input your task!' }]}
        >
          <Input
            placeholder="Enter task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: '250px', marginRight: '10px' }}
          />
        </Form.Item>
        <Button type="primary" onClick={addTask} icon={<PlusOutlined />}>
          Add Task
        </Button>
      </Form>
      <List
        style={{ marginTop: '20px', width: '450px' }} // Increased width
        bordered
        dataSource={renderTasks}
        renderItem={(item, index) => (
          <TodoItem
            key={index}
            item={item}
            index={(currentPage - 1) * pageSize + index}
            showModal={showModal}
            deleteTask={deleteTask}
            toggleCompleteTask={toggleCompleteTask}
          />
        )}
      />
      <Pagination
        style={{ marginTop: '20px', textAlign: 'center' }}
        current={currentPage}
        pageSize={pageSize}
        total={tasks.length}
        onChange={onPageChange}
      />
      <Modal
        title="Edit Task"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            name="task"
            rules={[{ required: true, message: 'Please input your task!' }]}
          >
            <Input
              placeholder="Edit task"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TodoList;

