import { Project } from 'type/project'
import { cleanObject } from 'utils/index'
import { useHttp } from 'utils/http'
import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query'
import { useAddConfig, useDeleteConfig, useEditConfig } from './use-optimistics-options'

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  // param改变时自动获取数据
  return useQuery<Project[], Error>(['projects', param], () =>
    client('projects', { data: cleanObject(param || {}) })
  )
}

// 外部传入queryKey，更具有通用性
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
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

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: 'POST'
      }),
    // {
    //   onSuccess: () => queryClient.invalidateQueries('projects')
    // }
    useAddConfig(queryKey)
  )
}

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: 'DELETE'
      }),
    useDeleteConfig(queryKey)
  )
}

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(['project', { id }], () => client(`projects/${id}`), {
    enabled: Boolean(id)
  })
}
