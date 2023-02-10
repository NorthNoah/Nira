import React, { memo } from 'react'

const list = memo(({ list, users }) => {
  return (
    <div>
      <table>
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
                <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
})

export default list
