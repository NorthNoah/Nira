import styled from '@emotion/styled'
import { Spin } from 'antd'
import { ScreenContainer } from 'components/lib'
import React from 'react'
import { useDocumentTitle } from 'utils'
import { useKanbans } from 'utils/kanban'
import { useTasks } from 'utils/task'
import { CreateKanban } from './create-kanban'
import { CreateTask } from './create-task'
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
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPannel />
      {isLoading ? (
        <Spin size={'large'} />
      ) : (
        <ColumnsContainer>
          {kanbans?.map((kanban) => (
            <KanbanColumn key={kanban.id} kanban={kanban}></KanbanColumn>
          ))}
          <CreateKanban />
        </ColumnsContainer>
      )}
      {/* 任务编辑模态框 */}
      <TaskModal />
    </ScreenContainer>
  )
}

export default KanbanPage

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`
