import React, { memo } from 'react'
export interface User {
  id: number
  name: string
  email: string
  title: string
  organization: string
  token: string
}
interface SearchPanelProps {
  users: User[]
  param: {
    name: string
    personId: string
  }
  setParam: (param: SearchPanelProps['param']) => void
}

const SearchPannel = memo(({ users, param, setParam }: SearchPanelProps) => {
  // const [param, setParam] = useState({
  //     projectName: '',
  //     personId: ''
  // })

  return (
    <form>
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(e) =>
            setParam({
              // 注意浅拷贝写法
              ...param,
              name: e.target.value
            })
          }
        />
        <select
          value={param.personId}
          onChange={(e) =>
            setParam({
              ...param,
              personId: e.target.value
            })
          }
        >
          <option value="">负责人</option>
          {/* 遍历users列表 */}
          {users.map((user) => {
            return (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            )
          })}
        </select>
      </div>
    </form>
  )
})

export default SearchPannel
