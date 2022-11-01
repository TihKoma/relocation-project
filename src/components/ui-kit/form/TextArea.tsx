import {
  ChangeEvent,
  forwardRef,
  TextareaHTMLAttributes,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import styled from '@emotion/styled'
import { UseControllerReturn } from 'react-hook-form'

import { Error } from '@/components/ui-kit/form/Error'
import { composeRefs } from '@/modules/utils/composeRefs'
import { noop } from '@/modules/utils/noop'
import { linkifyText } from '@/modules/utils/text/linkify-text'
import { SCROLLBAR_DISPLAY_NONE_MIXIN } from '@/styles/mixins'

type BaseTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>
type OverwrittenProps = 'value' | 'onChange'
type ProxiedTextAreaAttributes = Omit<BaseTextAreaProps, OverwrittenProps>

interface TextAreaProps extends ProxiedTextAreaAttributes {
  className?: string
  value?: string
  onChange?: (val: string, event: ChangeEvent) => void
  autoresize?: boolean
  withBackground?: boolean
  error?: string
  classNameInput?: string
  'data-test-id'?: string
  onCursorPositionChange?: (text: string, position: number | null) => void
  initialInputHeight?: number
  withHighlightLinks?: boolean
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      className,
      classNameInput,
      value,
      onChange = noop,
      autoresize = false,
      withBackground = false,
      error,
      onCursorPositionChange: onCursorPositionChangeOutside,
      initialInputHeight, //remove after refactoring
      withHighlightLinks,
      autoFocus,
      ...restProps
    },
    ref,
  ) {
    const testId = restProps['data-test-id'] || 'textarea'
    const innerRef = useRef<HTMLTextAreaElement>(null)
    const highlightsRef = useRef<HTMLDivElement>(null)
    const initHeight = useRef<number | null | undefined>(initialInputHeight)

    useEffect(() => {
      if (autoFocus) {
        const formElement = innerRef?.current
        formElement?.focus()
        formElement?.setSelectionRange(
          formElement?.value.length,
          formElement?.value.length,
        )
      }
    }, [autoFocus])

    useEffect(() => {
      if (!innerRef.current || !autoresize) {
        return
      }
      if (initHeight.current === null) {
        const { height } = innerRef.current.getBoundingClientRect()
        initHeight.current = height
      }
      innerRef.current.style.height = `${initHeight.current}px`
      innerRef.current.style.height = `${innerRef.current.scrollHeight}px`

      if (highlightsRef.current) {
        highlightsRef.current.style.height = `${initHeight.current}px`
        highlightsRef.current.style.height = `${innerRef.current.scrollHeight}px`
      }

      const indent = 10
      const { bottom } = innerRef.current.getBoundingClientRect()
      const diff = document.documentElement.clientHeight - indent - bottom
      if (diff < 0) {
        innerRef.current.style.height = `${
          innerRef.current.scrollHeight + diff
        }px`

        if (highlightsRef.current) {
          highlightsRef.current.style.height = `${
            highlightsRef.current.scrollHeight + diff
          }px`
        }
      }
    }, [value, autoresize])
    useEffect(() => {
      if (!autoresize && innerRef.current?.style.height) {
        innerRef.current.style.removeProperty('height')
        highlightsRef.current?.style.removeProperty('height')
      }
    }, [autoresize])

    const onCursorPositionChange = () => {
      onCursorPositionChangeOutside?.(
        value ?? '',
        innerRef.current?.selectionStart ?? null,
      )
    }

    const onChangeValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.currentTarget.value
      onChange(newValue, event)
    }

    const highlights = useHighlights(value ?? '', withHighlightLinks ?? false)

    // TODO add prop withPaddings
    return (
      <Container className={className}>
        {withHighlightLinks && (
          <Highlights ref={highlightsRef} withPaddings={withBackground}>
            {highlights}
          </Highlights>
        )}
        <TextAreaStyled
          className={classNameInput}
          ref={composeRefs([ref, innerRef])}
          value={value}
          onScroll={(event) => {
            if (highlightsRef.current) {
              highlightsRef.current.scrollTop = (
                event.target as HTMLTextAreaElement
              ).scrollTop
            }
          }}
          onClick={onCursorPositionChange}
          onKeyUp={onCursorPositionChange}
          onChange={onChangeValue}
          withPaddings={withBackground}
          withBackground={withBackground}
          data-test-id={`${testId}:input`}
          {...restProps}
        />
        {error && <Error>{error}</Error>}
      </Container>
    )
  },
)

const sharedTextStyles = `
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`

const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
`
const Highlights = styled.div<{
  withPaddings: boolean
}>`
  padding: ${(props) => (props.withPaddings ? '1.6rem' : 0)};
  overflow-y: auto;

  ${SCROLLBAR_DISPLAY_NONE_MIXIN};

  position: absolute;
  z-index: 2;

  background-color: transparent;

  pointer-events: none;

  white-space: pre-wrap;
  word-wrap: break-word;
  color: transparent;

  ${sharedTextStyles};
`
const Mark = styled.mark`
  color: #3f37c9;
  background: transparent;
  word-break: break-word;
`
const SimpleText = styled.span`
  word-break: break-word;
`
const TextAreaStyled = styled.textarea<{
  withBackground: boolean
  withPaddings: boolean
}>`
  padding: ${(props) => (props.withPaddings ? '1.6rem' : 0)};
  z-index: 1;

  flex-grow: 1;

  background-color: transparent;
  border-radius: ${(props) => (props.withBackground ? '1.2rem' : 0)};
  border: none;

  resize: none;

  color: black;
  ${sharedTextStyles};

  ${(props) =>
    props.withBackground ? `background-color: ${props.theme.moon};` : ''}

  outline: none;

  &:disabled {
    pointer-events: none;
    background: silver;
    color: black;
  }

  &::placeholder {
    color: silver;
    font-size: 1.4rem;
  }
`

type FieldTextAreaProps = UseControllerReturn & TextAreaProps
export const FieldTextArea = forwardRef<
  HTMLTextAreaElement,
  FieldTextAreaProps
>(({ field, fieldState, ...props }, ref) => {
  return (
    <TextArea
      {...field}
      error={fieldState.error?.message}
      ref={ref}
      {...props}
    />
  )
})

const useHighlights = (text: string, withHighlightLinks: boolean) => {
  return useMemo(() => {
    if (!text || !withHighlightLinks) {
      return ''
    }

    const elements = linkifyText(text)
    return elements.map((item, index) => {
      if (typeof item === 'string') {
        return <SimpleText key={item + index}>{item}</SimpleText>
      }
      return <Mark key={item.text + index}>{item.text}</Mark>
    })
  }, [withHighlightLinks, text])
}
