import { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router'
import { useProject } from 'utils/project'
import { useTask } from 'utils/task'
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
  const projectId = useProjectIdInUrl()
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

export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam(['editingTaskId'])
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId))
  // 进入编辑状态
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id })
    },
    [setEditingTaskId]
  )

  // 关闭模态框
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: '' })
  }, [setEditingTaskId])

  return {
    taskModalOpen: Boolean(editingTask),
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading
  }
}
