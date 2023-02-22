import styled from '@emotion/styled'

// 一行垂直居中
export const Row = styled.div<{
  gap?: number | boolean
  between?: boolean
  marginBottom?: number
}>`
  display: flex;
  align-items: center;
  /* 可选属性，不传入则为undefined */
  justify-content: ${(props) => (props.between ? 'space-between' : undefined)};
  /* 可选属性，无默认值 */
  margin-bottom: ${(props) => `${props.marginBottom}rem`};
  /* 针对直接子元素 */
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    /* 可选属性，且不传入时有默认值 */
    margin-right: ${(props) =>
      typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
  }
`
