import React from 'react'
import { Kanban } from 'type/kanban'
import { useTasks } from 'utils/task'
import { useTasksSearchParams } from './util'

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  // 查找数据，filter
  const { data: allTasks } = useTasks(useTasksSearchParams())
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id)
  return (
    <div>
      <h3>{kanban.name}</h3>
      {tasks?.map((task) => (
        <div key={task.id}>{task.name}</div>
      ))}
    </div>
  )
}
