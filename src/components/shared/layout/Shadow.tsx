import styled from '@emotion/styled'

export const Shadow = styled.div<{ position: 'top' | 'bottom' }>`
  width: 100%;
  height: 2.8rem;
  margin-top: -2.8rem;
  z-index: 1;

  position: sticky;
  left: 0;
  right: 0;

  pointer-events: none;

  ${(props) =>
    props.position === 'top'
      ? `
    top: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.03) 0%, transparent 100%);
  `
      : `
    bottom: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.03) 0%, transparent 100%);
  `}
`
