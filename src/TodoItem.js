// TodoItem.js
import React from 'react';
import { List, Button, Modal, Input } from 'antd';

const { confirm } = Modal;

const TodoItem = ({ item, index, showModal, deleteTask }) => {
  return (
    <List.Item
      actions={[
        <Button type="link" onClick={() => showModal(index)}>
          Edit
        </Button>,
        <Button type="link" onClick={() => deleteTask(index)} danger>
          Delete
        </Button>,
      ]}
    >
      {item.text}
    </List.Item>
  );
};

export default TodoItem;
