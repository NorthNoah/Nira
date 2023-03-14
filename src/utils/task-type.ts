import { useQuery } from 'react-query'
import { TaskType } from 'type/task-type'
import { cleanObject } from 'utils'
import { useHttp } from './http'

export const useTaskTypes = (param?: Partial<TaskType>) => {
  const client = useHttp()
  // param改变时自动获取数据
  return useQuery<TaskType[], Error>(['tasktypes', param], () =>
    client('tasktypes', { data: cleanObject(param || {}) })
  )
}
