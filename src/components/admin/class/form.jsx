import React from 'react';
import { Button, Form, Input } from 'antd';

const ClassForm = ({ onFinish, onCancel }) => {
  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      name="class_form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <Form.Item
        label="Tên lớp"
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập tên lớp!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mô tả"
        name="description"
        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Tạo lớp</Button>
        <Button onClick={onCancel} style={{ marginLeft: 8 }}>Hủy</Button>
      </Form.Item>
    </Form>
  );
};

export default ClassForm;
