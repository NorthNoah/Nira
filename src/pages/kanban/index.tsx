import styled from '@emotion/styled'
import { Spin } from 'antd'
import { Drop, DropChild, Drag } from 'components/drag-and-drop'
import { ScreenContainer } from 'components/lib'
import React, { useCallback } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useDocumentTitle } from 'utils'
import { useKanbans, useReorderKanban } from 'utils/kanban'
import { useReorderTask, useTasks } from 'utils/task'
import { CreateKanban } from './create-kanban'
import { KanbanColumn } from './kanban-column'
import { SearchPannel } from './search-pannel'
import { TaskModal } from './task-modal'
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams
} from './util'

const KanbanPage = () => {
  useDocumentTitle('看板列表')
  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams())
  // task页面的loading
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())
  const isLoading = taskIsLoading || kanbanIsLoading
  const onDragEnd = useDragEnd()
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPannel />
        {isLoading ? (
          <Spin size={'large'} />
        ) : (
          // 拖放
          <ColumnsContainer>
            <Drop type={'COLUMN'} direction={'horizontal'} droppableId={'kanban'}>
              <DropChild style={{ display: 'flex' }}>
                {kanbans?.map((kanban, index) => (
                  // 拖拽
                  <Drag key={kanban.id} draggableId={'kanban' + kanban.id} index={index}>
                    <KanbanColumn key={kanban.id} kanban={kanban}></KanbanColumn>
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban />
          </ColumnsContainer>
        )}
        {/* 任务编辑模态框 */}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  )
}

export default KanbanPage

// 更改为渲染DropChild元素
export const ColumnsContainer = styled('div')`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`

export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams())
  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey())
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey())
  const { data: allTasks = [] } = useTasks(useTasksSearchParams())
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return
      }
      // 看板排序
      if (type === 'COLUMN') {
        const fromId = kanbans?.[source.index].id
        const toId = kanbans?.[destination.index].id
        if (!fromId || !toId || fromId === toId) {
          return
        }
        const type = destination.index > source.index ? 'after' : 'before'
        reorderKanban({ fromId, referenceId: toId, type })
      }
      if (type === 'ROW') {
        const fromKanbanId = +source.droppableId
        const toKanbanId = +destination.droppableId
        if (fromKanbanId === toKanbanId) {
          return
        }
        const fromTask = allTasks.filter((task) => task.kanbanId === fromKanbanId)[source.index]
        const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[destination.index]
        if (fromTask?.id === toTask?.id) {
          return
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type: fromKanbanId === toKanbanId && destination.index > source.index ? 'after' : 'before'
        })
      }
    },
    [kanbans, reorderKanban, allTasks, reorderTask]
  )
}
