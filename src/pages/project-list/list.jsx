import React, { memo } from 'react'

const list = memo(({ list }) => {
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
              <tr>
                <td>{project.name}</td>
                <td>{project.personName}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
})

export default list
