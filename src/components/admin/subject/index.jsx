import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Dropdown, Menu, Modal, Row, Upload, message } from 'antd';
import { EllipsisOutlined, UploadOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import Dashboard from "../Dashboard";
import ClassForm from "./form";
import FormKT from './formKT';
import FormDiem from './formDiem';
import { subjectService } from '../../services/subject.service';

const props = {
  name: 'file',
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const SubjectManagement = () => {
  const { classId } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    loadSubjects(classId);
  }, [classId]);

  const loadSubjects = (classId) => {
    subjectService.getAllSubjects(classId)
      .then(response => setSubjects(response))
      .catch(error => console.error('Error loading subjects:', error));
  };

  const showModal = (title) => {
    setIsModalVisible(true);
    setModalTitle(title);
  };

  const showModal1 = (title) => {
    setIsModalVisible1(true);
    setModalTitle(title);
  };

  const showModal2 = (title) => {
    setIsModalVisible2(true);
    setModalTitle(title);
  };

  const handleOk = (values) => {
    if (modalTitle === 'Tạo mới lớp học') {
      subjectService.createSubject(classId, values)
        .then(() => {
          message.success('Subject created successfully');
          loadSubjects(classId);
        })
        .catch(error => {
          message.error('Failed to create subject');
          console.error('Error creating subject:', error);
        });
    } else if (modalTitle === 'Chỉnh sửa lớp học') {
      subjectService.updateSubject(selectedSubject.id, values)
        .then(() => {
          message.success('Subject updated successfully');
          loadSubjects(classId);
        })
        .catch(error => {
          message.error('Failed to update subject');
          console.error('Error updating subject:', error);
        });
    }
    setIsModalVisible(false);
    setIsModalVisible1(false);
    setIsModalVisible2(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisible1(false);
    setIsModalVisible2(false);
  };

  const handleView = () => {
    showModal1('Chỉnh sửa lớp học');
  }

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case 'edit':
        showModal('Chỉnh sửa lớp học');
        break;
      case 'view':
        showModal2('Xem điểm');
        break;
      case 'delete':
        subjectService.deleteSubject(selectedSubject.id)
          .then(() => {
            message.success('Subject deleted successfully');
            loadSubjects(classId);
          })
          .catch(error => {
            message.error('Failed to delete subject');
            console.error('Error deleting subject:', error);
          });
        break;
      default:
        break;
    }
  };

  return (
    <Dashboard>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Quản lý lớp học</h1>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </div>
      <Row gutter={[16, 16]}>
        {subjects.map(subject => (
          <Col key={subject.id} xs={8} sm={16} md={24} lg={32}>
            <Card
              title={subject.name}
              extra={
                <Dropdown
                  overlay={
                    <Menu onClick={handleMenuClick}>
                      <Menu.Item key="edit">Chỉnh sửa</Menu.Item>
                      <Menu.Item key="delete">Xoá</Menu.Item>
                      <Menu.Item key="view">Xem điểm</Menu.Item>
                    </Menu>
                  }
                  trigger={['click']}
                  onVisibleChange={(visible) => visible && setSelectedSubject(subject)}
                >
                  <EllipsisOutlined />
                </Dropdown>
              }
              style={{ width: '100%' }}
            >
              <p className='cursor-pointer' onClick={() => handleView()}>{subject.description}</p>
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
          initialValues={selectedSubject}
          onCancel={handleCancel}
        />
      </Modal>
      <Modal
        title={modalTitle}
        visible={isModalVisible1}
        onCancel={handleCancel}
        footer={null}
      >
        <FormKT
          onFinish={handleOk}
          initialValues={selectedSubject}
          onCancel={handleCancel}
        />
      </Modal>
      <Modal
        title={modalTitle}
        visible={isModalVisible2}
        onCancel={handleCancel}
        footer={null}
      >
        <FormDiem
          onFinish={handleOk}
          initialValues={selectedSubject}
          onCancel={handleCancel}
        />
      </Modal>
    </Dashboard>
  );
};

export default SubjectManagement;
