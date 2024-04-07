import React, { useEffect, useState } from 'react';
import { Button, Form, Radio, Space } from 'antd';
import axios from 'axios';

const FormKT = ({ onFinish, onCancel }) => {
    const [form] = Form.useForm();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios.get('api/questions')
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }, []);

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
            {questions.map((question, index) => (
                <Form.Item
                    key={index}
                    label={question.title}
                    name={`answer_${index}`}
                    rules={[{ required: true, message: 'Vui lòng chọn đáp án!' }]}
                >
                    <Radio.Group>
                        <Space direction="vertical">
                            {question.options.map((option, optIndex) => (
                                <Radio key={optIndex} value={option.value}>{option.label}</Radio>
                            ))}
                        </Space>
                    </Radio.Group>
                </Form.Item>
            ))}
            <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
                <Button onClick={onCancel} style={{ marginLeft: 8 }}>Cancel</Button>
            </Form.Item>
        </Form>
    );
};

export default FormKT;
