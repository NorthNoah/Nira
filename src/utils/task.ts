import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query'
import { Task } from 'type/task'
import { cleanObject } from 'utils'
import { useHttp } from './http'
import { SortProps } from './kanban'
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderConfig,
  useReorderTaskConfig
} from './use-optimistics-options'

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp()
  // param改变时自动获取数据
  return useQuery<Task[], Error>(['tasks', param], () =>
    client('tasks', { data: cleanObject(param || {}) })
  )
}

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp()
  // const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: 'PATCH',
        data: params
      }),
    // {
    //   onSuccess: () => queryClient.invalidateQueries('projects'),
    //   // 实现乐观更新
    //   // async onMutate(target) {
    //   //   const previousItems = queryClient.getQueryData(queryKey)
    //   //   queryClient.setQueryData(queryKey, (old?: Project[]) => {
    //   //     return old?.map(project => project.id === target.id ? {...project, ...target} : project)
    //   //   })
    //   //   return {previousItems}
    //   // },
    //   // onError(error, newItem, context) {
    //   //   queryClient.setQueryData(queryKey, (context as {previousItem: Project[]}).previousItem)
    //   // }
    // }
    useEditConfig(queryKey)
  )
}

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: 'POST'
      }),
    // {
    //   onSuccess: () => queryClient.invalidateQueries('projects')
    // }
    useAddConfig(queryKey)
  )
}

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: 'DELETE'
      }),
    useDeleteConfig(queryKey)
  )
}

// 获取Task详情
export const useTask = (id?: number) => {
  const client = useHttp()
  return useQuery<Task>(['task', { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id)
  })
}

export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation((params: SortProps) => {
    return client('tasks/reorder', {
      data: params,
      method: 'POST'
    })
  }, useReorderTaskConfig(queryKey))
}
