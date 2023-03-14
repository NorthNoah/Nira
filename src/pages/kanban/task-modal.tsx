import { Drawer, Form, Input, Modal } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React from 'react'
import { useEffect } from 'react'
import { useEditTask } from 'utils/task'
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
  const closeModal = () => {
    // 关闭模态框
    close()
    // 刷新表格
    form.resetFields()
  }

  const onFinish = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue })
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
      visible={taskModalOpen}
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
        <Form.Item label={'任务组'} name={'organization'}></Form.Item>
      </Form>
    </Modal>
  )
}
