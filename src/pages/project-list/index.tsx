import React, { useMemo } from 'react'
import SearchPannel from './search-panel'
import List from './list'
import { useDebounce, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { Button, Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useUrlQueryParam } from 'utils/url'
import { Row } from 'components/lib'
import { useDispatch } from 'react-redux/es/exports'
import { projectListActions } from './project-list.slice'
// 此种写法 默认访问3000端口
// const apiUrl = process.env.REACT_APP_API_URL

// 本地开发时(npm start)，访问mock；构建产物(npm build),访问真实地址
const ProjectListPages = () => {
  // 两个参数
  //   const [projName, setProjName] = useState('')
  //   const [personId, setPersonId] = useState('')

  // 映射userId和userName
  // const [param, setParam] = useState({
  //   name: '',
  //   personId: ''
  // })

  // 通过hook管理查询的参数
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  const projectsParam = useMemo(() => {
    return { ...param, personId: Number(param.personId) || undefined }
  }, [param])
  const debouncedParam = useDebounce(projectsParam, 500)

  // // 获取数据
  // const [list, setList] = useState([])

  // // loading和error处理
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState<null | Error>(null)

  // const client = useHttp()

  // 当参数改变时，获取接口中的数据
  // useEffect(() => {
  // fetch(`${apiUrl}/projects?name=${projName}&personId=${personId}`).then(async (response) => {
  // qs工具简化查询
  // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async (response) => {
  //   if (response.ok) {
  //     const res = await response.json()
  //     setList(res)
  //   }
  // })

  // // 请求前：切换为loading状态
  // setIsLoading(true)
  // // 请求成功后，清除loading状态
  // client('projects', { data: cleanObject(debouncedParam) })
  //   .then(setList)
  //   .catch(err => {
  //     setList([])
  //     setError(error)
  //   })
  //   .finally(() => setIsLoading(false))

  // // 统一使用useAsync管理异步操作
  // run(client('projects', { data: cleanObject(debouncedParam) }))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debouncedParam])

  // 只需要触发一次
  // useMount(() => {
  // fetch(`${apiUrl}/users`).then(async (response) => {
  //   if (response.ok) {
  //     const res = await response.json()
  //     setUsers(res)
  //   }
  // })

  // client('users').then(setUsers)
  // })
  const { isLoading, error, data: list, retry } = useProjects(debouncedParam)
  const { data: users } = useUsers()
  useDocumentTitle('项目列表', false)
  const dispatch = useDispatch()
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={() => dispatch(projectListActions.openProjectModal())}>创建项目</Button>
      </Row>
      <SearchPannel param={projectsParam} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List refresh={retry} loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  )
}
ProjectListPages.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`
export default ProjectListPages
