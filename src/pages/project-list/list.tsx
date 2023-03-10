import styled from '@emotion/styled'
import { Dropdown, Menu, Modal, Table } from 'antd'
import { TableProps } from 'antd/lib/table'
import { ButtonNoPadding } from 'components/lib'
import { Pin } from 'components/pin'
import dayjs from 'dayjs'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDeleteProject, useEditProject } from 'utils/project'
import { Project } from '../../type/project'
import { User } from '../../type/User'
import { useProjectModal, useProjectsQueryKey } from './util'
// extends的作用：使得所有的props都能透传到table,，此时List传进来的props类型为Table已有类型+users的类型
interface ListProps extends TableProps<Project> {
  users: User[]
}

const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectsQueryKey())
  const { startEdit } = useProjectModal()
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })
  const editProject = (id: number) => () => startEdit(id)
  return (
    // <div>
    //   <Table dataSource={list} columns={columns}>
    //     <thead>
    //       <tr>
    //         <th>名称</th>
    //         <th>负责人</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {list.map((project) => {
    //         return (
    //           <tr key={project.id}>
    //             <td>{project.name}</td>
    //             {/* 需要从userNames中寻找到符合id的并返回 */}
    //             <td>{users.find((user) => user.id === project.personId)?.name || '未知'}</td>
    //           </tr>
    //         )
    //       })}
    //     </tbody>
    //   </Table>
    // </div>
    <Container>
      <Table
        rowKey="id"
        pagination={false}
        columns={[
          {
            title: <Pin checked={true} disabled={true} />,
            render(value, project) {
              return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
            }
          },
          {
            title: '名称',
            // 跳转到相应的项目页面，使用Link
            sorter: (a, b) => a.name.localeCompare(b.name),
            render(value, project) {
              return <Link to={String(project.id)}>{project.name}</Link>
            }
          },
          {
            title: '部门',
            dataIndex: 'organization'
          },
          {
            title: '负责人',
            render(project) {
              return (
                <span>{users.find((user) => user.id === project.personId)?.name || '未知'}</span>
              )
            }
          },
          {
            title: '创建时间',
            render(project) {
              return (
                <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}</span>
              )
            }
          },
          {
            render(value, project) {
              return <More project={project} />
            }
          }
        ]}
        // 将所有除了users的props内容展开并传入,此时等于dataSource = {list},loading = {isLoading}
        {...props}
      />
    </Container>
  )
}
const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal()
  const editProject = (id: number) => () => startEdit(id)
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey())
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: '确定删除这个项目吗?',
      content: '点击确定删除',
      okText: '确定',
      onOk() {
        deleteProject({ id })
      }
    })
  }
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={editProject(project.id)} key={'edit'}>
            编辑
          </Menu.Item>
          <Menu.Item onClick={() => confirmDeleteProject(project.id)} key={'delete'}>
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type="link">...</ButtonNoPadding>
    </Dropdown>
  )
}

const Container = styled.div``

export default List
