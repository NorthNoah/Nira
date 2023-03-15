import React from 'react'
import { Kanban } from 'type/kanban'
import { useTasks } from 'utils/task'
import { useTaskTypes } from 'utils/task-type'
import { useTasksModal, useTasksSearchParams } from './util'
import taskIcon from 'assets/task.svg'
import bugIcon from 'assets/bug.svg'
import styled from '@emotion/styled'
import { Card } from 'antd'
import { CreateTask } from './create-task'
import { Task } from 'type/task'
import { Mark } from 'components/Mark'

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes()
  // 根据id查找对应的type名称
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name
  // type名称不存在
  if (!name) {
    return null
  }
  // type名称存在
  return <img alt={'task-icon'} src={name === 'task' ? taskIcon : bugIcon}></img>
}

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal()
  const { name: keyword } = useTasksSearchParams()
  return (
    <div key={task.id}>
      <TaskItem onClick={() => startEdit(task.id)}>
        <div>{task.name}</div>
        <TaskTypeIcon id={task.typeId} />
        {/* <p>
          <Mark keyword={keyword} name={task.name} />
        </p> */}
      </TaskItem>
    </div>
  )
}
interface myKanban {
  kanban: Kanban
}

export const KanbanColumn = ({ kanban }: myKanban) => {
  // 查找数据，filter
  const { data: allTasks } = useTasks(useTasksSearchParams())
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id)
  const { startEdit } = useTasksModal()
  return (
    <div>
      <Container>
        <h3>{kanban.name}</h3>
        <TaskContainer>
          {tasks?.map((task) => (
            <TaskCard task={task} />
          ))}
          <CreateTask kanbanId={kanban.id} />
        </TaskContainer>
      </Container>
    </div>
  )
}

export const Container = styled.div`
  min-width: 20rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1rem;
`
const TaskItem = styled(Card)`
  margin-bottom: 0.5rem;
  cursor: pointer;
`

const TaskContainer = styled.div`
  /* 滑动条 */
  overflow: scroll;
  flex: 1;

  /* 隐藏y方向滚动条 */
  ::-webkit-scrollbar {
    display: none;
  }
`
