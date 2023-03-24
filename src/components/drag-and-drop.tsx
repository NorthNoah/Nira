import React, { ReactNode } from 'react'
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps
} from 'react-beautiful-dnd'

// drop：放置
// 重写子节点类型为ReactNode
type DropProps = Omit<DroppableProps, 'children'> & { children: ReactNode }

export const Drop = ({ children, ...props }: DropProps) => {
  return (
    <Droppable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          // 复制子元素，并强制添加参数，子元素无需显式添加props
          return React.cloneElement(children, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided
          })
        }
        // 若无子节点，则返回空的div
        return <div />
      }}
    </Droppable>
  )
}

// 类型包括Drop子元素的参数，以及普通元素
type DropChildProps = Partial<{ provided: DroppableProvided } & DroppableProvidedProps> &
  React.HTMLAttributes<HTMLDivElement>
// ref转发：在使用时可以添加ref参数
// 泛型<返回的标签类型，参数类型>
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  ({ children, ...props }, ref) => (
    // 返回的div元素绑定了ref，以及传入了props的参数
    <div ref={ref} {...props}>
      {children}
      {props.provided?.placeholder}
    </div>
  )
)

// drag：拖拽
type DragProps = Omit<DraggableProps, 'children'> & { children: ReactNode }
export const Drag = ({ children, ...props }: DragProps) => {
  return (
    <Draggable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            ref: provided.innerRef
          })
        }
        return <div />
      }}
    </Draggable>
  )
}
