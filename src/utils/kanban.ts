import { useQuery } from 'react-query'
import { Kanban } from 'type/kanban'
import { cleanObject } from 'utils'
import { useHttp } from './http'

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp()
  // param改变时自动获取数据
  return useQuery<Kanban[], Error>(['kanbans', param], () =>
    client('kanbans', { data: cleanObject(param || {}) })
  )
}
