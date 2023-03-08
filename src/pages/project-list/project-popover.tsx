import styled from '@emotion/styled'
import { Button, Divider, List, Popover, Typography } from 'antd'
import { ButtonNoPadding } from 'components/lib'
import React from 'react'
import { useProjects } from 'utils/project'
import { useProjectModal } from './util'

export const ProjectPopover = () => {
  const { data: projects, isLoading } = useProjects()
  const pinnedProjects = projects?.filter((project) => project.pin)
  const { open } = useProjectModal()

  const content = (
    <ContentContainer>
      <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.name}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding onClick={open} type="link">
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  )

  return (
    <Popover placement={'bottom'} content={content}>
      <span>项目</span>
    </Popover>
  )
}
const ContentContainer = styled.div`
  min-width: 30rem;
`
