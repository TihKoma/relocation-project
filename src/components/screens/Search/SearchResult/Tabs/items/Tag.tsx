import { FC } from 'react'
import Link from 'next/link'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { TextHighlighter } from '@/components/ui-kit/TextHighlighter'
import { SearchV2Summary_searchV2Summary_Buckets_Docs_Entity_Tag as TagType } from '@/modules/map/graphql/__generated__/SearchV2Summary'
import { ROUTES } from '@/modules/router'
import { getColorTheme } from '@/styles/themes'

export const Tag: FC<Omit<TagType, '__typename'>> = ({ tag }) => {
  return (
    <Link href={ROUTES.tagFeed.calcUrl({ tag })}>
      <Item>
        <TagTitle>
          <TextHighlighter text={`#${tag}` || ''} css={TagStyle} />
        </TagTitle>
      </Item>
    </Link>
  )
}

const Item = styled.li`
  padding: 0.4rem 1.6rem;

  overflow: hidden;

  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${getColorTheme('sun200')};
  }
`
const TagTitle = styled.div`
  display: flex;
  align-items: center;

  height: 4rem;

  cursor: pointer;
`
const TagStyle = css`
  align-items: center;
`
