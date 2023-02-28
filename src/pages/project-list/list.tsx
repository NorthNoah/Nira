import styled from '@emotion/styled'
import { Table } from 'antd'
import { TableProps } from 'antd/lib/table'
import dayjs from 'dayjs'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { User } from './search-panel'
export interface Project {
  id: number
  name: string
  personId: number
  pin: boolean
  organization: string
  created: number
}

// extends的作用：使得所有的props都能透传到table,，此时List传进来的props类型为Table已有类型+users的类型
interface ListProps extends TableProps<Project> {
  users: User[]
}

const list = memo(({ users, ...props }: ListProps) => {
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
          }
        ]}
        // 将所有除了users的props内容展开并传入,此时等于dataSource = {list},loading = {isLoading}
        {...props}
      />
    </Container>
  )
})

const Container = styled.div``

export default list
