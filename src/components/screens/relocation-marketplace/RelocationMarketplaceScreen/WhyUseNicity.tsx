import { FC, ReactNode } from 'react'
import styled from '@emotion/styled'

import {
  RelocationProfessionalsIcon,
  RelocationQuotesIcon,
  RelocationSchedulingIcon,
  RelocationSupportIcon,
} from '@/images'
import { mobileMedia, notMobileMedia, tabletMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { SectionTitle as SectionTitleBase } from './shared'

const items: {
  title: string
  description: string
  color: string
  icon: ReactNode
}[] = [
  {
    title: 'Reliable experts',
    description:
      'Find the best specialists, including real estate agents, movers, lawyers, and home inspectors',
    color: '#DBF6EE',
    icon: <RelocationProfessionalsIcon />,
  },
  {
    title: 'Instant quotes',
    description:
      'Get straightforward valuations and order confirmations from our service providers',
    color: '#FFE5D7',
    icon: <RelocationQuotesIcon />,
  },
  {
    title: 'Dedicated support',
    description:
      'We offer digital assistance 24/7. Get your quote and schedule relocation services online',
    color: '#E1EDFF',
    icon: <RelocationSupportIcon />,
  },
  {
    title: 'Smart move',
    description:
      'Find out the city and neighborhood that fit your preferences with the help of our data-driven technology',
    color: '#F7F0DD',
    icon: <RelocationSchedulingIcon />,
  },
]

type Props = {
  className?: string
}
export const WhyUseNicity: FC<Props> = ({ className }) => {
  return (
    <Container className={className}>
      <SectionTitle>Why Nicity?</SectionTitle>
      <Cards>
        {items.map((item) => (
          <Card key={item.title}>
            <CardIcon backgroundColor={item.color}>{item.icon}</CardIcon>
            <CardContent>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </Cards>
    </Container>
  )
}

const Container = styled.div`
  ${notMobileMedia} {
    margin: auto;
    padding: 0 2.4rem;
    max-width: 144rem;
  }

  ${mobileMedia} {
    padding: 0 1.6rem;
  }
`
const SectionTitle = styled(SectionTitleBase)`
  ${notMobileMedia} {
    margin-bottom: 4.4rem;

    font-size: 4.2rem;
    text-align: center;
    line-height: 5.2rem;
  }

  ${mobileMedia} {
    margin-bottom: 2.4rem;
  }
`

const Cards = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  display: grid;

  ${notMobileMedia} {
    grid-template-columns: repeat(4, 1fr);
    column-gap: 2.4rem;
  }

  ${mobileMedia} {
    row-gap: 2.4rem;
  }
`
const Card = styled.li`
  display: flex;

  border: 1px solid ${getColorTheme('strokeDefaultSecondary')};

  ${notMobileMedia} {
    padding: 6.4rem 1.2rem;
    height: 37.2rem;

    flex-direction: column;
    align-items: center;

    border-radius: 2rem;
  }

  ${tabletMedia} {
    height: 42.2rem;
  }

  ${mobileMedia} {
    padding: 2rem;

    border-radius: 1.6rem;
  }
`
const CardIcon = styled.div<{ backgroundColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${(props) => props.backgroundColor};

  ${notMobileMedia} {
    min-width: 8.8rem;
    min-height: 8.8rem;
    max-width: 8.8rem;
    max-height: 8.8rem;
    margin-bottom: 4.4rem;

    border-radius: 1.6rem;
  }

  ${mobileMedia} {
    min-width: 4.8rem;
    min-height: 4.8rem;
    max-width: 4.8rem;
    max-height: 4.8rem;
    margin-right: 1.6rem;

    border-radius: 0.8rem;

    & > svg {
      width: 2rem;
      height: 2rem;
    }
  }
`
const CardContent = styled.div``
const CardTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  color: ${getColorTheme('textDefaultPrimary')};

  ${notMobileMedia} {
    margin-bottom: 1.2rem;

    text-align: center;
    font-size: 2.4rem;
    line-height: 2.8rem;
  }

  ${mobileMedia} {
    margin-bottom: 0.4rem;

    font-size: 1.6rem;
    line-height: 2.4rem;
  }
`
const CardDescription = styled.div`
  font-style: normal;
  font-weight: 400;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};

  ${notMobileMedia} {
    text-align: center;
    font-size: 1.8rem;
    line-height: 2.4rem;
  }

  ${mobileMedia} {
    font-size: 1.4rem;
    line-height: 2rem;
  }
`
