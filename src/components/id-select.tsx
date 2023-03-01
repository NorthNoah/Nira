import { Select } from 'antd'
import React from 'react'
import { Raw } from 'type'

// 透传Select的所有参数,且防止冲突
type SelectProps = React.ComponentProps<typeof Select>

interface idSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value: Raw | null | undefined
  // 限制了只能调value
  onChange: (value?: number) => void
  // 默认选项
  defaultOptionName?: string
  // 每个选项
  option?: { name: string; id: number }[]
}

// 将传入的value都转化为number，若NaN则转化为0
const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value))

const IdSelect = (props: idSelectProps) => {
  const { value, onChange, defaultOptionName, option, ...restProps } = props
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        // value为显示顺序
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}

      {option?.map((option) => {
        return <Select.Option value={option.id}>{option.name}</Select.Option>
      })}
    </Select>
  )
}

export default IdSelect
