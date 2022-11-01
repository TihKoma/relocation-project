import styled from '@emotion/styled'

import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

export const Item = styled.a`
  width: 100%;
  height: 100%;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  cursor: pointer;
`

export const Image = styled.img`
  width: 100%;

  object-fit: cover;
  border-radius: 1.6rem;
  background-color: ${getColorTheme('backgroundDefaultSecondary')};

  ${notMobileMedia} {
    height: 28.4rem;
  }

  ${mobileMedia} {
    height: 10rem;
    margin-bottom: 1.2rem;
  }
`

export const Label = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  border-radius: 1.6rem 0;
  background-color: ${getColorTheme('backgroundAccentPrimary')};

  color: ${getColorTheme('textDefaultQuinary')};
  font-style: normal;
  font-weight: 500;
  font-feature-settings: 'liga' off;

  ${notMobileMedia} {
    padding: 1.2rem 1.6rem;

    font-size: 2rem;
    line-height: 2.4rem;
  }

  ${mobileMedia} {
    padding: 0.8rem 1rem;

    font-size: 1.2rem;
    line-height: 1.6rem;
  }
`

export const ServiceName = styled.div<{
  isInverted?: boolean
  isSmall?: boolean
}>`
  border-radius: 4rem;

  font-style: normal;
  font-weight: 500;
  color: ${(props) =>
    props.isInverted
      ? getColorTheme('textDefaultQuinary')(props)
      : getColorTheme('textDefaultPrimary')(props)};

  ${notMobileMedia} {
    padding: ${(props) => (props.isSmall ? '0.8rem 1.6rem' : '1.6rem 2.4rem')};

    position: absolute;
    left: 3.2rem;
    bottom: 3.2rem;

    background-color: ${(props) =>
      props.isInverted
        ? getColorTheme('backgroundDefaultQuaternary')(props)
        : getColorTheme('backgroundDefaultPrimary')(props)};

    font-size: ${(props) => (props.isSmall ? '1.6rem' : '2rem')};
    line-height: 2.4rem;
  }

  ${mobileMedia} {
    padding: 0.8rem 0;
    width: 100%;

    text-align: center;
    background-color: ${(props) =>
      props.isInverted
        ? getColorTheme('backgroundDefaultQuaternary')(props)
        : getColorTheme('backgroundDefaultSecondary')(props)};

    font-size: 1.2rem;
    line-height: 1.6rem;
  }
`
