import { Card, Input } from 'antd'
import React from 'react'
import { useEffect, useState } from 'react'
import { useAddTask } from 'utils/use-task'
import { useProjectIdInUrl, useTasksQueryKey } from './util'

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState('')
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey())
  const projectId = useProjectIdInUrl()
  const [inputMode, setInputMode] = useState(false)

  const submit = async () => {
    await addTask({ name, kanbanId, typeId: 1 })
    // 是否处于正在输入状态
    setInputMode(false)
    setName('')
  }

  const toggle = () => setInputMode((mode) => !mode)

  useEffect(() => {
    // 重置setName的状态
    if (!inputMode) {
      setName('')
    }
  }, [inputMode])

  //切换输入状态
  if (!inputMode) {
    return <div onClick={toggle}>+创建事务</div>
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={'需要做些什么'}
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Card>
  )
}
