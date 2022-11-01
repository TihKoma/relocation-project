import { ComponentProps, forwardRef } from 'react'
import dynamic from 'next/dynamic'

import type { PostFormProps, PostFormRef } from './PostForm'

export { CreatePostButton } from './CreatePostButton'
export {
  DataForCreatePostContext,
  DataForCreatePostContextProvider,
  useDataForCreatePostContext,
} from './CreatePostContext'
export { CreatePostFromFeedButton } from './CreatePostFromFeedButton'
export { usePostForm } from './use-post-form'

const PostFormComponent = dynamic<PostFormProps>(
  () => import('./PostForm').then((mod) => mod.PostForm),
  {
    ssr: false,
  },
)

export const PostForm = forwardRef<
  PostFormRef,
  ComponentProps<typeof PostFormComponent>
>((props, ref) => <PostFormComponent {...props} forwardedRef={ref} />)
