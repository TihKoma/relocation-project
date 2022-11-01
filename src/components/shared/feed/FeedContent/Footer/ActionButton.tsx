import styled from '@emotion/styled'

export const ActionButton = styled.button`
  background: inherit;
  border: none;
  display: flex;
  align-items: center;
  padding: 0;
  font-size: 15px;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.2);
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      opacity: 0.5;
    }
  }
`
