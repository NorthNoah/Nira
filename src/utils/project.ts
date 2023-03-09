import { useAsync } from 'utils/use-async'
import { Project } from 'pages/project-list/list'
import { cleanObject } from 'utils/index'
import { useHttp } from 'utils/http'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  // param改变时自动获取数据
  return useQuery<Project[], Error>(['projects', param], () =>
    client('projects', { data: cleanObject(param || {}) })
  )
}

export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )
}

export const useAddProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: 'POST'
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )
}
