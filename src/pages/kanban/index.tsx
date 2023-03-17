import styled from '@emotion/styled'
import { Spin } from 'antd'
import { Drop, DropChild, Drag } from 'components/drag-and-drop'
import { ScreenContainer } from 'components/lib'
import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useDocumentTitle } from 'utils'
import { useKanbans } from 'utils/kanban'
import { useTasks } from 'utils/task'
import { CreateKanban } from './create-kanban'
import { KanbanColumn } from './kanban-column'
import { SearchPannel } from './search-pannel'
import { TaskModal } from './task-modal'
import { useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from './util'

const KanbanPage = () => {
  useDocumentTitle('看板列表')
  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams())
  // task页面的loading
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())
  const isLoading = taskIsLoading || kanbanIsLoading
  return (
    <DragDropContext onDragEnd={() => {}}>
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
export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`
