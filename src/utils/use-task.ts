import { QueryKey, useMutation } from 'react-query'
import { Task } from 'type/task'
import { useHttp } from './http'
import { useAddConfig } from './use-optimistics-options'

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
