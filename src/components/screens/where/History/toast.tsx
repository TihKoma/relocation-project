import { FC, useEffect, useRef, useState } from 'react'
import { useMutation } from '@apollo/client'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import type { ToastContentProps } from 'react-toastify'
import { toast } from 'react-toastify'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { useAnalytics } from '@/modules/analytics'
import { MUTATION_DELETE_QUIZ } from '@/modules/quiz'

export const useRemoveQuizWithUndo = (quizId: string, delay: number) => {
  const [deleteQuiz] = useMutation(MUTATION_DELETE_QUIZ, {
    update: (cache, _, context) => {
      if (!context.variables?.id) {
        return
      }
      cache.evict({
        id: `Quiz:${context.variables.id}`,
      })
    },
  })

  const quizIdToRemove = useRef<string | null>(null)

  const analytics = useAnalytics()

  const removeQuiz = () => {
    quizIdToRemove.current = quizId
    return toast(
      (props) => (
        <Toast
          onUndo={() => {
            quizIdToRemove.current = null
          }}
          {...props}
        />
      ),
      {
        onClose: () => {
          if (quizIdToRemove.current) {
            deleteQuiz({
              variables: {
                id: quizIdToRemove.current,
              },
            })
            analytics.removeQuizFromHistory({ quizId: quizIdToRemove.current })
          }
        },
        style: {
          height: '5.2rem',
          padding: '1.6rem',
          background: '#12151F',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.16)',
          borderRadius: '12px',
        },
        autoClose: delay,
      },
    )
  }
  return removeQuiz
}

type Props = {
  onUndo: () => void
} & ToastContentProps<unknown>

const Toast: FC<Props> = ({ onUndo, toastProps }) => {
  const [time, setTime] = useState(
    toastProps.autoClose ? toastProps.autoClose / 1000 : 0,
  )

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((time) => {
        const newTime = time - 1
        if (newTime === 0) {
          window.clearInterval(intervalId)
        }
        return newTime
      })
    }, 1000)
    return () => window.clearInterval(intervalId)
  }, [toastProps.autoClose])

  return (
    <Container>
      Quiz has been deleted
      <Time time={toastProps.autoClose || 0}>
        {time}
        <svg>
          <circle r={'7'} cx={'8'} cy={'8'} />
        </svg>
      </Time>
      <ButtonUndo onClick={onUndo}>undo</ButtonUndo>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2rem;
  color: rgba(255, 255, 255, 0.8);
`
const ButtonUndo = styled(NormalizedButton)`
  color: #ffffff;
  font-weight: 500;
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.8);
`
const countdown = keyframes`
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: 4.4rem;
  }
`
const Time = styled.div<{ time: number }>`
  width: 1.6rem;
  height: 1.6rem;
  margin-left: auto;
  margin-right: 0.8rem;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.8rem;
  svg {
    width: 1.6rem;
    height: 1.6rem;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    transform: rotateY(-180deg) rotateZ(-90deg);
  }
  svg circle {
    stroke-dasharray: 4.4rem;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    stroke-width: 0.1rem;
    stroke: white;
    fill: none;
    animation: ${countdown} ${({ time }) => time}s linear 1 forwards;
  }
`
