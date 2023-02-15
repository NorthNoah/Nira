import React, { memo, useState, useEffect } from 'react'
import SearchPannel from './search-panel'
import List from './list'
import * as qs from 'qs'
import { cleanObject, useMount, useDebounce } from 'utils'
// 此种写法 默认访问3000端口
// const apiUrl = process.env.REACT_APP_API_URL
const apiUrl = 'http://localhost:3001'

// 本地开发时(npm start)，访问mock；构建产物(npm build),访问真实地址
const ProjectListPages = memo(() => {
  // 两个参数
  //   const [projName, setProjName] = useState('')
  //   const [personId, setPersonId] = useState('')
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  // 获取数据
  const [list, setList] = useState([])
  // 映射userId和userName
  const [users, setUsers] = useState([])

  const debouncedParam = useDebounce(param, 500)

  // 当参数改变时，获取接口中的数据
  useEffect(() => {
    // fetch(`${apiUrl}/projects?name=${projName}&personId=${personId}`).then(async (response) => {
    // qs工具简化查询
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async (response) => {
      if (response.ok) {
        const res = await response.json()
        setList(res)
      }
    })
  }, [debouncedParam])

  // 只需要触发一次
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        const res = await response.json()
        setUsers(res)
      }
    })
  })

  return (
    <div>
      <SearchPannel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </div>
  )
})

export default ProjectListPages
