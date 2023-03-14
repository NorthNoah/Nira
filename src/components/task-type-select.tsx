import React from 'react'
import { useTaskTypes } from 'utils/task-type'
import { useUsers } from 'utils/user'
import IdSelect from './id-select'

const TasktypeSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: tasktypes } = useTaskTypes()
  return <IdSelect option={tasktypes || []} {...props} />
}

export default TasktypeSelect
