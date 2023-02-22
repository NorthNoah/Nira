import styled from '@emotion/styled'
import { Table } from 'antd'
import dayjs from 'dayjs'
import React, { memo } from 'react'
import { User } from './search-panel'
interface Project {
  id: number
  name: string
  personId: number
  pin: boolean
  organization: string
  created: number
}

interface ListProps {
  list: Project[]
  users: User[]
}

const list = memo(({ list, users }: ListProps) => {
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
        pagination={false}
        columns={[
          {
            title: '名称',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name)
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
        dataSource={list}
      />
    </Container>
  )
})

const Container = styled.div`
  padding: 0 3.2rem;
`

export default list
