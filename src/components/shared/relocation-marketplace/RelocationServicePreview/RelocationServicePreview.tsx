import { FC } from 'react'
import Link from 'next/link'

import { Image, Item, Label, ServiceName } from '../shared'

type Props = {
  title: string
  url: string
  imageSrc: string
  isNew?: boolean
}

export const RelocationServicePreview: FC<Props> = ({
  title,
  url,
  imageSrc,
  isNew,
}) => {
  return (
    <Link href={url} passHref key={'guide'}>
      <Item>
        {isNew && <Label>New</Label>}
        <Image src={imageSrc} />
        <ServiceName>{title}</ServiceName>
      </Item>
    </Link>
  )
}
