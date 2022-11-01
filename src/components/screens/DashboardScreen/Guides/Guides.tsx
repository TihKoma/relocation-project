import { ComponentProps, FC } from 'react'
import NextLink from 'next/link'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { ChevronIcon } from '@/images'
import { ROUTES } from '@/modules/router'

import { GuideCard } from './GuideCard'

type Props = {
  className?: string
}
export const Guides: FC<Props> = ({ className }) => {
  const guidesList: ComponentProps<typeof GuideCard>[] = [
    {
      title: 'Moving From Abroad',
      imageSrc:
        'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F73ba00be-87ab-432b-88cd-3a1f41feb47d%2Fworldwide.png?table=block&id=86c74986-189e-44d5-8cfe-9ec881d69e8f&cache=v2',
      id: 'moving-from-abroad',
    },
    {
      title: 'How To Find A Job?',
      imageSrc:
        'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd5e6acf3-8000-4e61-8acb-f8c27ef86ebd%2Fjob-search.png?table=block&id=684cead5-5016-4a94-b1d7-d25543216d0f&cache=v2',
      id: 'how-to-find-a-job',
    },
    {
      title: 'Do I Really Need To Move?',
      imageSrc:
        'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F656fe972-e582-4bf0-b294-2f3ec53deb00%2Fquestion.png?table=block&id=fac74bde-0cd0-4aea-9c67-3373e26a2647&cache=v2',
      id: 'do-i-really-need-to-move',
    },
    {
      title: 'Understand The Cost Of Living',
      imageSrc:
        'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F1674f261-febd-409c-b179-fb225efd7791%2Fsave-money.png?table=block&id=238bdab6-67a5-4eb7-96be-8cb3370aa461&cache=v2',
      id: 'understand-the-cost-of-living',
    },
    {
      title: 'Find Your Dream Location',
      imageSrc:
        'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5ad84ffe-8d80-4527-847b-5653bb491465%2Fhouse_(1).png?table=block&id=8efa5930-cfcb-4948-a349-1ec628704683&cache=v2',
      id: 'find-your-dream-location',
    },
    {
      title: 'Profession Demanded By States',
      imageSrc:
        'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd4921040-7e82-4fdf-8367-dfaabefbade7%2Fjob.png?table=block&id=0e95c95a-2e65-429d-bb65-cd9f6c17c6ce&cache=v2',
      id: 'profession-demanded-by-states',
    },
    {
      title: 'Calculator Of Relocation Budget',
      imageSrc:
        'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F2c70c641-6053-47cf-9964-8afb0418e0bb%2Fbudget.png?table=block&id=0c21f442-7ec2-42f4-99e8-c30bf8a25319&cache=v2',
      id: 'calculator-of-relocation-budget',
    },
    {
      title: 'Your Future Taxes',
      imageSrc:
        'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F196d5794-09eb-45f6-8faa-852a32091c28%2Ftaxes.png?table=block&id=bb728d1a-760b-4671-9695-2d694f1bf324&cache=v2',
      id: 'your-future-taxes',
    },
    {
      title: 'Finding Money For A Deposit',
      imageSrc: 'https://storage.nicity.com/money_with_wings.png',
      id: 'finding-money-for-a-deposit',
    },
    {
      title: 'Long-Term Rent',
      imageSrc: 'https://storage.nicity.com/house_with_garden.png',
      id: 'long-term-rent',
    },
  ]
  return (
    <Container className={className}>
      <Title>Guides</Title>
      <NextLink href={ROUTES.guide.calcUrl()} passHref>
        <Link>
          <Button
            size={'xSmall'}
            viewType={'ghost'}
            Icon={<ChevronIcon direction={'right'} />}
          >
            All articles
          </Button>
        </Link>
      </NextLink>
      <CardsWrapper>
        {guidesList.map((item) => {
          return <GuideCard key={item.title} {...item} />
        })}
      </CardsWrapper>
    </Container>
  )
}

const Container = styled.div`
  max-width: 100%;

  display: grid;
  grid-auto-flow: row;
  grid-template: auto auto / auto auto;
  overflow: hidden;
`
const Title = styled.div`
  padding-left: 1.6rem;

  justify-self: start;
  font-weight: 500;
  font-size: 2rem;
`
const CardsWrapper = styled.div`
  max-width: 100%;
  overflow: auto;
  padding: 1.2rem 1.2rem 2.4rem 1.2rem;

  display: grid;
  grid-auto-flow: column;
  grid-template-rows: auto auto;
  gap: 1.2rem;
  grid-column: 1/3;
  justify-content: start;
`
const Link = styled.a`
  justify-self: end;
`
