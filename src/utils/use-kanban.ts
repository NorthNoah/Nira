import { QueryKey, useMutation } from 'react-query'
import { Kanban } from 'type/kanban'
import { useHttp } from './http'
import { useAddConfig, useDeleteConfig } from './use-optimistics-options'

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
