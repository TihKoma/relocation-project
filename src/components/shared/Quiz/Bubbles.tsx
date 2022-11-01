import { FC, useMemo, useState } from 'react'
import { keyframes } from '@emotion/css'
import styled from '@emotion/styled'
import { useController } from 'react-hook-form'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { useAnalytics } from '@/modules/analytics'
import { StepBubbles } from '@/modules/quiz'
import { mobileMedia, notDesktopMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  quizId: string
  step: StepBubbles
}

export const Bubbles: FC<Props> = ({
  quizId,
  step: {
    id,
    payload: { bubbles },
  },
}) => {
  const { field } = useController({ name: id, defaultValue: [] })
  const value = field.value || []
  const sortBubbles = useMemo(
    () =>
      [...bubbles]
        .sort(
          // @ts-ignore
          (a, b) => sortById[a.choiceId] - sortById[b.choiceId],
        )
        .map((bubble) => {
          if (bubble.choiceId === publicTransport) {
            const [left, ...right] = bubble.title.split(' ')
            return { ...bubble, title: [left, <br />, right.join(' ')] }
          }
          if (bubble.bubbles) {
            return {
              ...bubble,
              bubbles: bubble.bubbles
                .map((partBubble) => {
                  if (partBubble.choiceId === familiesWithKids) {
                    const [left, ...right] = partBubble.title.split(' ')
                    return {
                      ...partBubble,
                      title: [left, <br />, right.join(' ')],
                    }
                  }
                  return partBubble
                })
                .sort(
                  (a, b) =>
                    // @ts-ignore
                    sortChildrenById[bubble.choiceId][a.choiceId] -
                    // @ts-ignore
                    sortChildrenById[bubble.choiceId][b.choiceId],
                ),
            }
          }
          return bubble
        }),
    [bubbles],
  )
  const analytics = useAnalytics()
  const clickAnalytics = (bubbleId: string) => {
    analytics?.quizFactorsBubbleClick({
      quizId: quizId,
      bubbleTitle: bubbles?.reduce(
        (acc, { title, choiceId, bubbles: bubblesPart }) => {
          if (acc) {
            return acc
          }
          if (choiceId === bubbleId) {
            return title
          }
          return (
            bubblesPart?.find((bubble) => bubble.choiceId === bubbleId)
              ?.title ?? ''
          )
        },
        '',
      ),
    })
  }
  const detectActive = (bubbleId: string) => value.includes(bubbleId)
  const onChange = (bubbleId: string, bubblesPart?: any[]) => () => {
    clickAnalytics(bubbleId)
    if (detectActive(bubbleId)) {
      const partIds = bubblesPart?.map((bubble) => bubble?.choiceId) ?? []
      field.onChange(
        value.filter((id: string) => {
          return id !== bubbleId && !partIds.includes(id)
        }),
      )
    } else {
      field.onChange([...value, bubbleId])
    }
  }

  const [isAnimationEnabled, setAnimationEnabled] = useState(false)
  return (
    <Container>
      {sortBubbles.map((bubble) => {
        const isActive = detectActive(bubble.choiceId)
        if (bubble.bubbles) {
          return (
            <BigBubble
              key={bubble.choiceId}
              activeColor={bubble.color}
              isActive={false}
              onClick={() => {
                if (isActive) {
                  return
                }
                // @ts-ignore
                onChange(bubble.choiceId, bubble.bubbles)()
                setAnimationEnabled(true)
              }}
              isHidden={isActive}
              isAnimationEnabled={isAnimationEnabled}
            >
              <WrapperBubble>
                <div>
                  {isActive ? (
                    <BigBubble
                      isDisabled={bubble.cantSelect}
                      activeColor={bubble.color}
                      isActive
                      isHidden
                      onClick={() => {
                        // @ts-ignore
                        onChange(bubble.choiceId, bubble.bubbles)()
                        setAnimationEnabled(true)
                      }}
                      isAnimationEnabled={isAnimationEnabled}
                    >
                      {bubble.bubbles.map((partBubble) => {
                        return (
                          <PartBitBubble
                            key={partBubble.choiceId}
                            activeColor={partBubble.color}
                            isAnimationEnabled={isAnimationEnabled}
                            isActive={detectActive(partBubble.choiceId)}
                            onClick={(event) => {
                              event.stopPropagation()
                              onChange(partBubble.choiceId)()
                            }}
                          >
                            <WrapperBubble>
                              <div>
                                <BubbleText>{partBubble.title}</BubbleText>
                              </div>
                            </WrapperBubble>
                          </PartBitBubble>
                        )
                      })}
                      <BigBubble
                        isDisabled={bubble.cantSelect}
                        activeColor={bubble.color}
                        isActive
                        onClick={() => {
                          // @ts-ignore
                          onChange(bubble.choiceId, bubble.bubbles)()
                          setAnimationEnabled(true)
                        }}
                      >
                        <WrapperBubble>
                          <div>
                            <Icon src={bubble.image} />
                            <BubbleText>{bubble.title}</BubbleText>
                            <TipDisabled>Select categories</TipDisabled>
                          </div>
                        </WrapperBubble>
                      </BigBubble>
                    </BigBubble>
                  ) : (
                    <>
                      <Icon src={bubble.image} />
                      <BubbleText>{bubble.title}</BubbleText>
                    </>
                  )}
                </div>
              </WrapperBubble>
            </BigBubble>
          )
        }
        return (
          <Bubble
            activeColor={bubble.color}
            isActive={isActive}
            onClick={onChange(bubble.choiceId)}
          >
            <WrapperBubble>
              <div>
                <Icon src={bubble.image} />
                <BubbleText>{bubble.title}</BubbleText>
              </div>
            </WrapperBubble>
          </Bubble>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  ${notMobileMedia} {
    padding-bottom: 15%;
    padding-top: 3%;
  }
`
const BubbleText = styled.span`
  position: relative;
`
const WrapperBubble = styled.div`
  padding-top: 100%;

  position: relative;

  & > div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`
const Bubble = styled(NormalizedButton)<{
  activeColor: string
  isActive: boolean
}>`
  position: relative;
  &:before {
    content: '';

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    border-radius: 50%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.55) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  display: block;

  border-radius: 50%;
  background: ${(props) =>
    props.activeColor && props.isActive
      ? props.activeColor
      : `${getColorTheme('moon')(props)}`};

  font-weight: 500;
  font-size: 2rem;
  ${notDesktopMedia} {
    font-size: 1.6rem;
  }

  ${notMobileMedia} {
    width: 37.8%;
    &:nth-of-type(1) {
      margin-left: auto;
    }
    &:nth-of-type(2) {
      margin-top: -38%;
    }
    &:nth-of-type(3) {
      margin-left: auto;
      margin-top: -14%;
    }
    &:nth-of-type(4) {
      margin-top: -19%;
    }
    &:nth-of-type(5) {
      margin-left: auto;
      margin-top: -14%;
      margin-right: 3.7%;
    }
    &:nth-of-type(6) {
      margin-top: -1%;
    }
    &:nth-of-type(7) {
      margin-left: auto;
      margin-top: -53%;
    }
  }
  ${mobileMedia} {
    width: 42.3%;
    &:nth-of-type(1) {
      margin-left: auto;
    }
    &:nth-of-type(2) {
      margin-top: -19%;
    }
    &:nth-of-type(3) {
      margin-left: auto;
      margin-top: -8%;
    }
    &:nth-of-type(4) {
      margin-top: -29%;
    }
    &:nth-of-type(5) {
      margin-left: auto;
      margin-top: -9%;
      margin-right: 9%;
    }
    &:nth-of-type(6) {
      margin-top: 4%;
    }
    &:nth-of-type(7) {
      margin-left: auto;
      margin-top: -6%;
    }
  }
  transition: 225ms;
  &:hover {
    transform: scale(0.9);
  }
`
const TipDisabled = styled.div`
  display: none;
  margin-bottom: 34%;

  font-weight: normal;
  font-size: 1.4rem;
  text-align: center;
  color: ${getColorTheme('mercury')};
  white-space: nowrap;
`
const DURATION_ANIMATION = 550
const scale = keyframes`
  0% {
    width: 100%;
  }
  100% {
    width: 35%;
  }
`
const scaleMobile = keyframes`
  0% {
    width: 100%;
  }
  100% {
    width: 38%;
  }
`
const icon = keyframes`
  0% {
    width: 6.4rem;
    margin-bottom: 0.5rem;
    
    opacity: 1;
  }
  30% {
    opacity: 0;
  }
  100% {
    width: 0;
    margin-bottom: 0;
    
    opacity: 0;
  }
`
const iconMobile = keyframes`
  0% {
    width: 4.8rem;
    margin-bottom: 0.5rem;
    
    opacity: 1;
  }
  30% {
    opacity: 0;
  }
  100% {
    width: 0;
    margin-bottom: 0;
    
    opacity: 0;
  }
`

// @ts-ignore
const BigBubble = styled(Bubble)<{
  isActive: boolean
  isHidden: boolean
  isDisabled: boolean
  isAnimationEnabled: boolean
}>`
  ${notMobileMedia} {
    width: 57.1%;
    ${({ isActive, isHidden, isAnimationEnabled }) =>
      isActive
        ? `
      
     ${
       isHidden
         ? `
       width: 35%;
       ${
         isAnimationEnabled &&
         `animation: ${scale} ${DURATION_ANIMATION}ms linear 1;`
       }
      `
         : 'width: 100%;'
     } 
      
      font-size: 1.4rem;
      
      &:hover {
        transform: initial;
      }
      img {
        width: 0;
        margin-bottom: 0;
       
       ${
         isAnimationEnabled &&
         `animation: ${icon} ${DURATION_ANIMATION}ms linear 1;`
       }
        
      }
  `
        : ''}
  }
  ${mobileMedia} {
    width: 62.3%;
    ${({ isHidden, isActive, isAnimationEnabled }) =>
      isActive
        ? `
      
     ${
       isHidden
         ? `
       width: 38%;
       ${
         isAnimationEnabled &&
         `animation: ${scaleMobile} ${DURATION_ANIMATION}ms linear 1;`
       } 
      `
         : 'width: 100%;'
     } 
      
      &:hover {
        transform: initial;
      }
      img {
        width: 0;
        margin-bottom: 0;
        
        ${
          isAnimationEnabled &&
          `animation: ${iconMobile} ${DURATION_ANIMATION}ms linear 1;`
        } 
       
        
      }
  `
        : ''}
  }

  ${({ isHidden }) =>
    isHidden
      ? `
    z-index: 0; 
    cursor: initial;
    
    background: transparent;
    
    &:before {
      content: initial;
    }
    & ${BigBubble}:nth-of-type(1) {
      margin-left: 0;
    }
    &:hover {
      transform: initial;
    }
  `
      : ''}
  ${({ isHidden, isActive }) =>
    !isHidden && isActive
      ? `
    margin: 0 !important;
    &:hover {
      transform: scale(0.9);
    } 
  `
      : ''}

  position: relative;

  ${({ isDisabled }) =>
    isDisabled
      ? `
      background: transparent !important;
      
      &:before {
        content: initial;
      }
      ${TipDisabled} {
        display: block;
      }
  `
      : ''}
`
const move1 = keyframes`
  0% {
    top: 0;
    
    opacity: 0.7;
  }
  100% {
    top: -106%;
    
    opacity: 1;
  }
`
const move2 = keyframes`
  0% {
    top: 0;
    left: 0;
    
    opacity: 0.7;
  }
  100% {
    top: 70%;
    left: 79%;
    
    opacity: 1;
  }
`
const move3 = keyframes`
  0% {
    top: 0;
    right: 0;
    
    opacity: 0.7;
  }
  100% {
    top: 70%;
    right: 79%;
    
    opacity: 1;
  }
`
const move4 = keyframes`
  0% {
    top: 0;
    left: 0;
    
    opacity: 0.7;
  }
  100% {
    top: -41%;
    left: -97%;
    
    opacity: 1;
  }
`
const move5 = keyframes`
  0% {
    top: 0;
    right: 0;
    
    opacity: 0.7;
  }
  100% {
    top: -41%;
    right: -97%;
    
    opacity: 1;
  }
`
const text = keyframes`
  0% {
    opacity: 0;
  }
  70%{
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const PartBitBubble = styled(Bubble)<{ isAnimationEnabled: boolean }>`
  width: 100% !important;
  margin: 0 !important;

  position: absolute;

  z-index: -1;

  ${notMobileMedia} {
    font-size: 1.4rem;
  }
  ${mobileMedia} {
    font-size: 1.2rem;
  }

  span {
    ${({ isAnimationEnabled }) =>
      isAnimationEnabled &&
      ` animation: ${text} ${DURATION_ANIMATION}ms linear 1;`}
  }
  &:nth-of-type(1) {
    top: -106%;
    left: 0;

    ${({ isAnimationEnabled }) =>
      isAnimationEnabled &&
      `animation: ${move1} ${DURATION_ANIMATION}ms linear 1;`}
  }
  &:nth-of-type(2) {
    top: 70%;
    left: 79%;

    ${({ isAnimationEnabled }) =>
      isAnimationEnabled &&
      `animation: ${move2} ${DURATION_ANIMATION}ms linear 1;`}
  }
  &:nth-of-type(3) {
    top: 70%;
    right: 79%;

    ${({ isAnimationEnabled }) =>
      isAnimationEnabled &&
      `animation: ${move3} ${DURATION_ANIMATION}ms linear 1;`}
  }
  &:nth-of-type(4) {
    top: -41%;
    left: -97%;

    ${({ isAnimationEnabled }) =>
      isAnimationEnabled &&
      `animation: ${move4} ${DURATION_ANIMATION}ms linear 1;`}
  }
  &:nth-of-type(5) {
    top: -41%;
    right: -97%;

    ${({ isAnimationEnabled }) =>
      isAnimationEnabled &&
      `animation: ${move5} ${DURATION_ANIMATION}ms linear 1;`}
  }
`
const Icon = styled.img`
  width: 6.4rem;
  margin-bottom: 0.5rem;
  ${mobileMedia} {
    width: 4.8rem;
  }

  position: relative;
`

const publicTransport = 'ac1f0e92-712d-400d-af4b-80afd51841ea'
const familiesWithKids = 'f9842504-c5b5-4eef-8548-b8a36b4dcf62'

const sortById = {
  'a338a648-f6f6-462c-9d17-27e5a99a7ab3': 0,
  '166e3374-6dcb-408b-81ab-80b14624d238': 1,
  '514343bc-edc0-4ea9-a189-eb2fc6e885af': 2,
  [publicTransport]: 3,
  '6fdf9413-dfd4-4559-9034-a571b47ab981': 4,
  'dda1b28b-5c2f-43c7-862b-bf4a712b613d': 5,
  '6842e5bd-b7da-43eb-a2ec-283a45d029db': 6,
}

const sortChildrenById = {
  '166e3374-6dcb-408b-81ab-80b14624d238': {
    'eff0f4e8-ec96-4d09-b847-fdc6b3b75fd2': 0,
    '0398d1fd-8a7d-4760-a37f-7a6eefd7d9aa': 1,
    '6ff71fe1-3a84-4160-ad11-368a3fe15a2e': 2,
  },
  '6fdf9413-dfd4-4559-9034-a571b47ab981': {
    '51da737e-0a11-4141-9bf0-3add6d322fed': 0,
    '5836f4e8-9168-49b1-9ec8-27ad1df19e8c': 1,
    '4bf6fbbe-224e-4c80-a9c9-66e79bee0a78': 2,
    '4dc12138-9346-4e40-8212-5954c951ff3c': 3,
    '0e072844-4c00-4685-b102-80f803785b2c': 4,
  },
  'dda1b28b-5c2f-43c7-862b-bf4a712b613d': {
    'b7f48782-74d9-41fa-884e-faf3727de189': 0,
    [familiesWithKids]: 1,
    '52ff62b8-26bd-463d-a818-cedf6c18323a': 2,
  },
}
