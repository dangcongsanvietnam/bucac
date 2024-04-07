import React from 'react';
import { Tabs } from 'antd';
import ListDiem from './listDiem';
import ChartDiem from './chartDiem';
const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: '1',
        label: 'Tab 1',
        children: <ListDiem />,
    },
    {
        key: '2',
        label: 'Tab 2',
        children: <ChartDiem />,
    },
];
const FormDiem = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
export default FormDiem;