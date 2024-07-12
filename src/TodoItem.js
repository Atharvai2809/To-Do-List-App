import React from 'react';
import { List, Button, Checkbox } from 'antd';

const TodoItem = ({ item, index, showModal, deleteTask, toggleCompleteTask }) => {
  return (
    <List.Item
      actions={[
        <Checkbox checked={item.completed} onChange={() => toggleCompleteTask(index)}>
          Completed
        </Checkbox>,
        <Button type="link" onClick={() => showModal(index)}>
          Edit
        </Button>,
        <Button type="link" onClick={() => deleteTask(index)} danger>
          Delete
        </Button>,
      ]}
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <span style={{ textDecoration: item.completed ? 'line-through' : 'none', flex: 1 }}>
        {item.text}
      </span>
    </List.Item>
  );
};

export default TodoItem;
