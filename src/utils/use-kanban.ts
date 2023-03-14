import { QueryKey, useMutation } from 'react-query'
import { Kanban } from 'type/kanban'
import { useHttp } from './http'
import { useAddConfig } from './use-optimistics-options'

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
