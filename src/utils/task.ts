import { useQuery } from 'react-query'
import { Task } from 'type/task'
import { cleanObject } from 'utils'
import { useHttp } from './http'

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp()
  // param改变时自动获取数据
  return useQuery<Task[], Error>(['tasks', param], () =>
    client('tasks', { data: cleanObject(param || {}) })
  )
}
