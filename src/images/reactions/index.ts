import { FC, SVGProps } from 'react'

import { ReactionType } from '../../../__generated__/globalTypes'
import { ReactComponent as AngryReactionEmoji } from './reaction-angry.svg'
import { ReactComponent as FunnyReactionEmoji } from './reaction-funny.svg'
import { ReactComponent as LikeReactionEmoji } from './reaction-like.svg'
import { ReactComponent as SadReactionEmoji } from './reaction-sad.svg'
import { ReactComponent as SuperReactionEmoji } from './reaction-super.svg'

export type ReactionEmoji = {
  type: ReactionType
  Emoji: FC<SVGProps<SVGSVGElement>>
}

export const reactionsEmojis: ReactionEmoji[] = [
  {
    type: ReactionType.LIKE,
    Emoji: LikeReactionEmoji,
  },
  {
    type: ReactionType.SUPER,
    Emoji: SuperReactionEmoji,
  },
  {
    type: ReactionType.FUNNY,
    Emoji: FunnyReactionEmoji,
  },
  {
    type: ReactionType.SAD,
    Emoji: SadReactionEmoji,
  },
  {
    type: ReactionType.ANGRY,
    Emoji: AngryReactionEmoji,
  },
]
