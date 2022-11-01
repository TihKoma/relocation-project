import { FC, ReactNode } from 'react'

import { MapPostContent } from './MapPostContent'

export default {
  title: 'DiscoveryMapPostPopup',
}

const DEFAULT_USER_NAME = 'Natasha Scott'
const DEFAULT_TEXT =
  'Hi there! I’m looking for a good, reliable painter bla-bla-bla'
const DEFAULT_MEDIA_SRC =
  'https://images.unsplash.com/photo-1639976518727-4c21281644e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
const DEFAULT_REACTIONS = {
  super: 34,
  like: 2,
  sad: 45,
  funny: 53,
  angry: 53,
  total: 187,
}
const DEFAULT_COMMENTS_COUNTER = 66

const Padding: FC<{ children: ReactNode }> = ({ children }) => (
  <div style={{ padding: '3rem' }}>{children}</div>
)

export const WithText = () => {
  return (
    <Padding>
      <MapPostContent userName={DEFAULT_USER_NAME} text={DEFAULT_TEXT} />
    </Padding>
  )
}

export const WithMedia = () => {
  return (
    <Padding>
      <MapPostContent
        userName={DEFAULT_USER_NAME}
        mediaSrc={DEFAULT_MEDIA_SRC}
      />
    </Padding>
  )
}

export const WithAvatar = () => {
  return (
    <Padding>
      <MapPostContent userName={DEFAULT_USER_NAME} text={DEFAULT_TEXT} />
    </Padding>
  )
}

export const WithComments = () => {
  return (
    <Padding>
      <MapPostContent
        userName={DEFAULT_USER_NAME}
        text={DEFAULT_TEXT}
        commentsCounter={DEFAULT_COMMENTS_COUNTER}
      />
    </Padding>
  )
}

export const WithAvatarAndComments = () => {
  return (
    <Padding>
      <MapPostContent
        userName={DEFAULT_USER_NAME}
        text={DEFAULT_TEXT}
        commentsCounter={DEFAULT_COMMENTS_COUNTER}
      />
    </Padding>
  )
}

export const WithAvatarAndReactions = () => {
  return (
    <Padding>
      <MapPostContent
        userName={DEFAULT_USER_NAME}
        text={DEFAULT_TEXT}
        reactions={DEFAULT_REACTIONS}
      />
    </Padding>
  )
}

export const WithAvatarAndReactionsAndComments = () => {
  return (
    <Padding>
      <MapPostContent
        userName={DEFAULT_USER_NAME}
        text={DEFAULT_TEXT}
        reactions={DEFAULT_REACTIONS}
        commentsCounter={DEFAULT_COMMENTS_COUNTER}
      />
    </Padding>
  )
}

export const FullContent = () => {
  return (
    <Padding>
      <MapPostContent
        userName={DEFAULT_USER_NAME}
        text={DEFAULT_TEXT}
        mediaSrc={DEFAULT_MEDIA_SRC}
        reactions={DEFAULT_REACTIONS}
        commentsCounter={DEFAULT_COMMENTS_COUNTER}
      />
    </Padding>
  )
}
