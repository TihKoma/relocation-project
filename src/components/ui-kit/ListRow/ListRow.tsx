import { ButtonHTMLAttributes, VFC } from 'react'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { getColorTheme } from '@/styles/themes'

// Design system List row: https://www.figma.com/file/VbeQSkYd8FIii8BzOL6F12/%E2%9D%96-Core?node-id=4435%3A37824

type Props = {
  icon?: JSX.Element
  title: string
  isSelected?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const ListRow: VFC<Props> = ({ icon, title, isSelected, ...props }) => {
  return (
    <Container isSelected={isSelected} {...props}>
      {icon}
      <Title isSelected={isSelected}>{title}</Title>
    </Container>
  )
}

const Title = styled.div<{ isSelected?: boolean }>`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  color: ${(props) =>
    props.isSelected
      ? getColorTheme('earth')(props)
      : getColorTheme('sun')(props)};
`
const Container = styled(NormalizedButton)<{ isSelected?: boolean }>`
  height: 3.6rem;
  width: 100%;
  min-width: 10.4rem;
  padding: 0.6rem 1.6rem;

  display: flex;
  align-items: center;

  background-color: ${(props) =>
    props.isSelected ? getColorTheme('neptune')(props) : 'inherit'};

  transition: 225ms;

  svg {
    margin-right: 1.6rem;
  }
  &:hover {
    background: ${getColorTheme('moon')};

    ${Title} {
      color: ${getColorTheme('sun')};
    }
  }
`
