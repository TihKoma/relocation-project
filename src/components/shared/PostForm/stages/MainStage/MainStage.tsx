import { useContext, useRef, useState, VFC } from 'react'
import styled from '@emotion/styled'

import { FileModel } from '@/components/shared/PostForm/Files'
import { PostFormStageContext } from '@/components/shared/PostForm/post-form-stage-context'
import {
  PostFormModel,
  PostFormModelEdit,
} from '@/components/shared/PostForm/types'
import { Button as ButtonBase } from '@/components/ui-kit/Button'
import { useIsNotMobileDevice } from '@/modules/device'
import { getMatchInPosition } from '@/modules/utils/text/linkify-text'
import { replaceSubstring } from '@/modules/utils/text/replace-substring'

import { Header } from './Header'
import { Previews } from './Previews'
import { TextField } from './TextField'
import { Toolbar } from './Toolbar'

type Props = {
  title: string
  isSubmitting: boolean
  region?: { id: string; name: string }
  onClose: (value: boolean) => void
  getFormValues: () => { content: string }
  dirtyFields: Record<keyof PostFormModel, boolean>
  initialValues: PostFormModel
  onMediaDelete: (file: FileModel) => void
  onTagClick: (newContent: string) => void
}
export const MainStage: VFC<Props> = ({
  isSubmitting,
  onClose,
  title,
  initialValues,
  getFormValues,
  onMediaDelete,
  onTagClick,
  region,
  dirtyFields,
}) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const selectedTagPositionsRef = useRef<[number, number] | null>(null)
  const [_, setFormStage] = useContext(PostFormStageContext)

  const isEdit = !!(initialValues as PostFormModelEdit).id

  const isPublishButtonDisabled =
    isSubmitting ||
    !region ||
    !(
      dirtyFields.content ||
      dirtyFields.media ||
      (isEdit && dirtyFields.geoData) ||
      (isEdit && dirtyFields.region)
    )

  const onCursorPositionChange = (text: string, position: number | null) => {
    if (!text || !position) {
      return
    }
    const linkUnderCursor = getMatchInPosition(text, position)
    if (linkUnderCursor?.schema === '#') {
      setSelectedTag(linkUnderCursor.text)
      selectedTagPositionsRef.current = [
        linkUnderCursor.index,
        linkUnderCursor.lastIndex,
      ]
    } else {
      setSelectedTag(null)
      selectedTagPositionsRef.current = null
    }
  }

  const onTagChipClick = (suggestion: string) => {
    if (selectedTagPositionsRef.current) {
      const [start, end] = selectedTagPositionsRef.current
      const { text } = replaceSubstring(getFormValues().content, suggestion, [
        start,
        end + 1,
      ])

      onTagClick(text)

      setSelectedTag(null)
      selectedTagPositionsRef.current = null
    }
  }

  const isMobile = useIsNotMobileDevice()
  return (
    <>
      <Header title={title} onClose={() => onClose(false)} />
      <TextField onCursorPositionChange={onCursorPositionChange} />
      <Previews onMediaDelete={onMediaDelete} />
      <Toolbar
        selectedTag={selectedTag}
        onLocationClick={() => setFormStage('location')}
        onTagClick={onTagChipClick}
      />
      <Button
        viewType={'primary'}
        size={isMobile ? 'medium' : 'large'}
        fullWidth
        type={'submit'}
        disabled={isPublishButtonDisabled || isSubmitting} // TODO replace with loading state, when it will be added to design system (isSubmitting)
        // isLoading={isSubmitting}
        data-test-id={'create-post:create-button'}
      >
        Publish
      </Button>
    </>
  )
}

const Button = styled(ButtonBase)`
  margin-top: 16px;
`
