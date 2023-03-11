import { useLocation } from 'react-router'
import { useProject } from 'utils/project'

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

export const useTasksSearchParams = () => ({ projectId: useProjectIdInUrl() })
export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]
