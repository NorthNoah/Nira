import { Button, Drawer, Form, Input, Modal } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import TasktypeSelect from 'components/task-type-select'
import UserSelect from 'components/user-select'
import React from 'react'
import { useEffect } from 'react'
import { useDeleteTask, useEditTask } from 'utils/task'
import { useTasksModal, useTasksQueryKey } from './util'

// antd自带样式布局
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
export const TaskModal = () => {
  const [form] = useForm()
  //此处的editingTask只表示状态，没有实现功能
  const { taskModalOpen, editingTaskId, editingTask, close } = useTasksModal()
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(useTasksQueryKey())
  const { mutateAsync: deleteTask, isLoading: deleteLoading } = useDeleteTask(useTasksQueryKey())

  const closeModal = () => {
    // 关闭模态框
    close()
    // 刷新表格
    form.resetFields()
  }

  const onFinish = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue })
    close()
  }
  const startDelete = () => {
    close()
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除任务吗',
      onOk() {
        return deleteTask({ id: Number(editingTaskId) })
      }
    })
  }

  //当form或editingTask改变时，更新表格数据
  useEffect(() => {
    form.setFieldsValue(editingTask)
  }, [form, editingTask])

  return (
    <Modal
      okText={'确认'}
      cancelText={'取消'}
      confirmLoading={editLoading}
      title={'编辑任务'}
      visible={Boolean(editingTask)}
      onCancel={closeModal}
      onOk={onFinish}
      forceRender={true}
    >
      {/* 初始值填充为被编辑的task */}
      <Form {...layout} initialValues={editingTask} form={form} onFinish={onFinish}>
        <Form.Item
          label={'任务名'}
          name={'name'}
          rules={[{ required: true, message: '请输入任务名' }]}
        >
          <Input placeholder={'请输入任务名称'}></Input>
        </Form.Item>
        {/* <Form.Item label={'任务组'} name={'organization'}></Form.Item> */}
        <Form.Item label={'经办人'} name={'processId'}>
          <UserSelect defaultOptionName={'经办人'}></UserSelect>
        </Form.Item>
        <Form.Item label={'类型'} name={'typeId'}>
          <TasktypeSelect defaultOptionName={'类型'}></TasktypeSelect>
        </Form.Item>
        <div style={{ textAlign: 'right' }}>
          <Button onClick={startDelete} style={{ fontSize: '14px' }} size={'small'}>
            删除
          </Button>
        </div>
      </Form>
    </Modal>
  )
}
