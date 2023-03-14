import { Button, Input } from 'antd'
import { Row } from 'components/lib'
import TasktypeSelect from 'components/task-type-select'
import UserSelect from 'components/user-select'
import React from 'react'
import { useSetUrlSearchParam } from 'utils/url'
import { useTasksSearchParams } from './util'

export const SearchPannel = () => {
  // 获取搜索参数
  const searchParams = useTasksSearchParams()
  const setSearchParams = useSetUrlSearchParam()
  // 重置
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined
    })
  }
  return (
    <Row marginBottom={4} gap={true}>
      <Input
        style={{ width: '20rem' }}
        placeholder={'任务名'}
        value={searchParams.name}
        onChange={(evt) => setSearchParams({ name: evt.target.value })}
      />
      <UserSelect
        defaultOptionName="经办人"
        value={searchParams.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TasktypeSelect
        defaultOptionName="类型"
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  )
}
