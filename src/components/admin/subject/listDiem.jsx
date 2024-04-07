import React, { useEffect, useState } from 'react';
import { List, Skeleton, Typography } from 'antd';
import axios from 'axios';
const ListDiem = () => {
    const [score, setScore] = useState([
        { id: 1, score: '2 diem', date: 'mung 1' },
        { id: 2, score: '10 diem', date: 'mung 2' },
        // Thêm các lớp khác nếu cần
      ]);
    // useEffect(() => {
    //     axios.get('api/questions')
    //         .then(response => {
    //             setScore(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching questions:', error);
    //         });
    // }, []);
    return (
        <>
            <List
                bordered
                dataSource={score}
                renderItem={(item) => (
                    <List.Item>
                        <Typography.Text mark>{item.score}</Typography.Text> {item.date}
                    </List.Item>
                )}
            />
        </>
    )
};
export default ListDiem;