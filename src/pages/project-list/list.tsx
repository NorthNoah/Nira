import { Table } from 'antd'
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
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Project, b: Project) => a.name.localeCompare(b.name)
    }
    // {
    //   title: "负责人",
    //   render: (list.map((project)) {
    //     return <span>
    //       {users.find((user) => user.id === project.personId)?.name || '未知'}
    //     </span>
    //   }
    // }
  ]
  return (
    <div>
      <Table dataSource={list} columns={columns}>
        <thead>
          <tr>
            <th>名称</th>
            <th>负责人</th>
          </tr>
        </thead>
        <tbody>
          {list.map((project) => {
            return (
              <tr key={project.id}>
                <td>{project.name}</td>
                {/* 需要从userNames中寻找到符合id的并返回 */}
                <td>{users.find((user) => user.id === project.personId)?.name || '未知'}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
})

export default list
