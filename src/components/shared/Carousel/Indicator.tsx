import { VFC } from 'react'
import styled from '@emotion/styled'

type Props = {
  onClick: (e: React.MouseEvent | React.KeyboardEvent) => void
  isSelected: boolean
  index: number
  label: string
}
export const Indicator: VFC<Props> = ({
  onClick,
  isSelected,
  index,
  label,
}) => {
  return (
    <Button
      onClick={onClick}
      isSelected={isSelected}
      key={index}
      aria-label={label}
    />
  )
}

const Button = styled.button<{ isSelected: boolean }>`
  width: 6px;
  height: 6px;

  margin: 0 3px;
  padding: 0;

  border: none;
  border-radius: 3px;
  background-color: ${({ isSelected }) => (isSelected ? '#000000' : '#e2e6ec')};

  cursor: pointer;
`
