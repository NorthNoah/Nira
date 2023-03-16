import styled from '@emotion/styled'
import { Button, Drawer, Form, Input, Spin } from 'antd'
import { ErrorBox } from 'components/lib'
import UserSelect from 'components/user-select'
import { useForm } from 'rc-field-form'
import React, { useEffect } from 'react'
import { useAddProject, useEditProject } from 'utils/project'
import { useProjectModal, useProjectsQueryKey } from './util'

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } = useProjectModal()
  const useMutateProject = editingProject ? useEditProject : useAddProject
  // 异步的mutate
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(useProjectsQueryKey())
  const [form] = useForm()
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      // 重置表单
      form.resetFields()
      close()
    })
  }
  const closeModal = () => {
    // 重置表单
    form.resetFields()
    close()
  }

  const title = editingProject ? '编辑项目' : '创建项目'

  //当表单改变时，设置表单数据
  useEffect(() => {
    form.setFieldsValue(editingProject)
  }, [editingProject, form])

  return (
    <Drawer forceRender={true} onClose={closeModal} visible={projectModalOpen} width={'100%'}>
      <Container>
        {isLoading ? (
          <Spin size={'large'} />
        ) : (
          <div>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form layout={'vertical'} style={{ width: '40rem' }} onFinish={onFinish}>
              <Form.Item
                label={'名称'}
                name={'name'}
                rules={[{ required: true, message: '请输入项目名' }]}
              >
                <Input placeholder={'请输入项目名称'}></Input>
              </Form.Item>
              <Form.Item
                label={'部门'}
                name={'organization'}
                rules={[{ required: true, message: '请输入部门名' }]}
              >
                <Input placeholder={'请输入部门名'}></Input>
              </Form.Item>
              <Form.Item label={'负责人'} name={'personId'}>
                <UserSelect defaultOptionName={'负责人'} />
              </Form.Item>
              <Form.Item style={{ textAlign: 'right' }}>
                <Button loading={mutateLoading} type="primary" htmlType={'submit'}>
                  提交
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Container>
    </Drawer>
  )
}

const Container = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
