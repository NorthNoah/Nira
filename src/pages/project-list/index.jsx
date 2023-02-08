import React, { memo, useState, useEffect } from 'react'
import SearchPannel from './search-panel'
import List from './list'
const apiUrl = process.env.REACT_APP_API_URL

// 本地开发时(npm start)，访问mock；构建产物(npm build),访问真实地址
const ProjectListPages = memo(() => {
  // 两个参数
  const [projName, setProjName] = useState('')
  const [personId, setPersonId] = useState('')

  // 获取数据
  const [list, setList] = useState([])

  // 当参数改变时，获取接口中的数据
  useEffect(() => {
    fetch(`${apiUrl}/projects`).then(async (response) => {
      const res = await response.json()
      setList(res)
    })
  }, [projName, personId])
  return (
    <div>
      <SearchPannel
        projName={projName}
        setProjName={setProjName}
        personId={personId}
        setPersonId={setPersonId}
      />
      <List list={list} />
    </div>
  )
})

export default ProjectListPages
