import { useMemo } from 'react'
import { useLocation } from 'react-router'
import { useProject } from 'utils/project'
import { useUrlQueryParam } from 'utils/url'

// 需要获取项目id和名称
export const useProjectIdInUrl = () => {
  const { pathname } = useLocation()
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}
export const useProjectInUrl = () => useProject(useProjectIdInUrl())

// 针对不同project查询不同的看板和tasks数据

// 获取看板查询参数
export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() })
// 根据查询参数获取queryKey
export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()]

export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'typeId', 'processorId', 'tagId'])
  // 从url直接读取projectId
  const projectId = useProjectInUrl()
  return useMemo(() => {
    return {
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name
    }
  }, [param, projectId])
}
export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]
