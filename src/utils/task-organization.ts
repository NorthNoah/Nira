import { useQuery } from 'react-query'
import { TaskOrgs } from 'type/task-organization'
import { TaskType } from 'type/task-type'
import { useHttp } from './http'

export const useTaskOrganizations = (param?: Partial<TaskType>) => {
  const client = useHttp()
  // param改变时自动获取数据
  return useQuery<TaskOrgs[], Error>(['taskorgs', param], () => client('taskorgs', { data: param }))
}
