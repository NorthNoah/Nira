import React from 'react'
import { useTaskTypes } from 'utils/task-type'
import IdSelect from './id-select'

const TaskOrganizationSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: taskorganization } = useTaskTypes()
  return <IdSelect option={taskOrgtypes || []} {...props} />
}

export default TaskOrganizationSelect
