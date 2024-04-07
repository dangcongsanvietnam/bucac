import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Dropdown, Menu, Modal, Row } from 'antd';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import Dashboard from "../Dashboard";
import ClassForm from "./form";
import { useNavigate } from 'react-router-dom';
import { classService } from '../../services/class.service';

const ClassManagement = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = () => {
    classService.getAllClass()
      .then(response => setClasses(response.data))
      .catch(error => console.error('Error loading classes:', error));
  };

  const showModal = (title) => {
    setIsModalVisible(true);
    setModalTitle(title);
  };

  const handleOk = (values) => {
    if (modalTitle === 'Tạo mới lớp học') {
      classService.newClass(values)
        .then(() => {
          loadClasses();
          setIsModalVisible(false);
        })
        .catch(error => console.error('Error creating class:', error));
    } else if (modalTitle === 'Chỉnh sửa lớp học') {
      classService.updateClass(selectedClass.id, values)
        .then(() => {
          loadClasses();
          setIsModalVisible(false);
        })
        .catch(error => console.error('Error updating class:', error));
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleView = (id) => {
    navigate(`/dashboard/class/${id}`);
  }

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case 'edit':
        showModal('Chỉnh sửa lớp học');
        break;
      case 'delete':
        classService.deleteClass(selectedClass.id)
          .then(() => {
            loadClasses();
            setSelectedClass(null);
          })
          .catch(error => console.error('Error deleting class:', error));
        break;
      case 'view':
        handleView(selectedClass.id);
        break;
      default:
        break;
    }
  };

  return (
    <Dashboard>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Quản lý lớp học</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal('Tạo mới lớp học')}>Tạo mới lớp</Button>
      </div>
      <Row gutter={[16, 16]}>
        {classes.map(cls => (
          <Col key={cls.id} xs={8} sm={16} md={24} lg={32}>
            <Card
              title={cls.name}
              extra={
                <Dropdown
                  overlay={
                    <Menu onClick={handleMenuClick}>
                      <Menu.Item key="edit">Chỉnh sửa</Menu.Item>
                      <Menu.Item key="delete">Xoá</Menu.Item>
                    </Menu>
                  }
                  trigger={['click']}
                  onVisibleChange={(visible) => visible && setSelectedClass(cls)}
                >
                  <EllipsisOutlined />
                </Dropdown>
              }
              style={{ width: '100%' }}
            >
              <p className='cursor-pointer' onClick={() => handleView(cls.id)}>{cls.description}</p>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={modalTitle}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <ClassForm
          onFinish={handleOk}
          initialValues={selectedClass}
          onCancel={handleCancel}
        />
      </Modal>
    </Dashboard>
  );
};

export default ClassManagement;
