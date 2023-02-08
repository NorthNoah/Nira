import React, { memo, useEffect, useState } from 'react'

const SearchPannel = memo(({ projName, setProjName, personId, setPersonId }) => {
  // const [param, setParam] = useState({
  //     projectName: '',
  //     personId: ''
  // })

  const [users, setUsers] = useState([])

  return (
    <div>
      <input
        type="text"
        value={projName}
        onChange={(e) =>
          setProjName({
            projName: e.target.value
          })
        }
      />
      <select
        value={personId}
        onChange={(e) =>
          setPersonId({
            personId: e.target.value
          })
        }
      >
        <option value="">负责人</option>
        {/* 遍历users列表 */}
        {users.map((user) => {
          return <option value={user.id}>{user.name}</option>
        })}
      </select>
    </div>
  )
})

export default SearchPannel
