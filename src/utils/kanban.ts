import { QueryKey, useMutation, useQuery } from 'react-query'
import { Kanban } from 'type/kanban'
import { cleanObject } from 'utils'
import { useHttp } from './http'
import {
  useAddConfig,
  useDeleteConfig,
  useReorderConfig,
  useReorderKanbanConfig
} from './use-optimistics-options'

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp()
  // param改变时自动获取数据
  return useQuery<Kanban[], Error>(['kanbans', param], () =>
    client('kanbans', { data: cleanObject(param || {}) })
  )
}

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        data: params,
        method: 'POST'
      }),
    // {
    //   onSuccess: () => queryClient.invalidateQueries('projects')
    // }
    useAddConfig(queryKey)
  )
}

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: 'DELETE'
      }),
    useDeleteConfig(queryKey)
  )
}

export interface SortProps {
  // 要重新排序的 item
  fromId: number
  // 目标 item
  referenceId: number
  // 放在目标item的前还是后
  type: 'before' | 'after'
  fromKanbanId?: number
  toKanbanId?: number
}
// 重新排序看板后，查询重排数据接口
export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation((params: SortProps) => {
    return client('ColReorder', {
      data: params,
      method: 'POST'
    })
  }, useReorderKanbanConfig(queryKey))
}
