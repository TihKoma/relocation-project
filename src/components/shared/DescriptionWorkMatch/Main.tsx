import { FC, ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import {
  DiningIcon,
  DiversityIcon,
  GroceriesIcon,
  InventoryIcon,
  ProximityIcon,
  PublicTransportIcon,
  SchoolsIcon,
  SocialLifeIcon,
  SpeedometerIcon as SpeedometerIconBase,
  ValueForMoneyIcon,
} from '@/images/description-work-match'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import {
  Paragraph as ParagraphBase,
  SubTitle as SubTitleBase,
  Wrapper as WrapperBase,
} from './shared'

export const Main = () => {
  return (
    <Container>
      <Wrapper>
        <Title>How does it work?</Title>
        <SubTitle>
          Your match with a given area is determined as a percentage from 0% to
          100%.
        </SubTitle>
        <MainParagraph>
          The higher the score, the better the match. The use of percentages
          shows how strong an area correlates in relative terms to other
          neighborhoods in the same city for a particular feature.
        </MainParagraph>
        <SpeedometerIcon />
        <Menu>
          <MenuItem id={SCORES.SCHOOLS}>Schools</MenuItem>
          <MenuItem id={SCORES.DIVERSITY}>Diversity</MenuItem>
          <MenuItem id={SCORES.PROXIMITY}>Proximity to your locations</MenuItem>
          <MenuItem id={SCORES.SOCIAL_LIFE}>Social life</MenuItem>
          <MenuItem id={SCORES.GROCERIES}>Groceries</MenuItem>
          <MenuItem id={SCORES.PUBLIC_TRANSIT}>Public transit</MenuItem>
          <MenuItem id={SCORES.INVENTORY}>Availability of properties</MenuItem>
          <MenuItem id={SCORES.DINING}>Dining</MenuItem>
          <MenuItem id={SCORES.AFFORDABILITY}>Affordability</MenuItem>
        </Menu>
        <Score id={SCORES.SCHOOLS}>
          <SchoolsIcon />
          <NameScore>Schools</NameScore>
          <Paragraph>
            The Schools score estimates the quality of public schools in a given
            neighborhood. Nicity rates schools based on overall student academic
            results and graduation data (currently only high schools) in
            comparison to the national average. The rating for a given
            neighborhood is based on the aggregate data of school districts
            present. Please note that individual school districts often cover
            several neighborhoods and may differ by grade level.
            <br />
            <br />
            Nicity takes into account rankings only for the specific type of
            school selected - elementary, middle, or high school. If you don’t
            choose a grade level, Nicity will include all types in the rating.
          </Paragraph>
        </Score>
        <Score id={SCORES.DIVERSITY}>
          <DiversityIcon />
          <NameScore>Diversity</NameScore>
          <Paragraph>
            Nicity values cultural and ethnic diversity. The Diversity score
            represents the level of cultural & ethnic diversity in a given
            neighbourhood. Diversity scores are highest in areas where the
            difference between largest and smallest cultural & ethnic category
            is the smallest.
            <br />
            <br />
            Selecting specific cultural & ethnic categories in addition to
            general ethnic diversity will yield scores indicating a higher
            representation of selected groups in a given neighborhood in
            comparison with the city average.
            <br />
            <br />
            Not important to you? Leave the Diversity Factor blank and it will
            not be calculated into your final match score.
          </Paragraph>
        </Score>
        <Score id={SCORES.PROXIMITY}>
          <ProximityIcon />
          <NameScore>Proximity</NameScore>
          <Paragraph>
            The score for how close landmarks, desirable infrastructure or work
            is to the neighborhood proposed by the Where engine is based on the
            estimated travel time from a neighborhood to up to four designated
            locations that you have added. Travel times are based public
            transport and car and make use of the fastest route for each
            location added.
            <br />
            <br />
            Don’t care if any particular locations are nearby? Nicity adjust for
            this and it won’t affect the final match score.
          </Paragraph>
        </Score>
        <Score id={SCORES.SOCIAL_LIFE}>
          <SocialLifeIcon />
          <NameScore>Social life</NameScore>
          <Paragraph>
            Social Life scores are based on the representation of a users chosen
            demographic group that is represented in a given neighbourhood. If
            your preferred demographic is “Young Families”, areas with a higher
            share of families will get a higher score.
            <br />
            <br />
            If you don’t have a preference, leave Social Life feature blank and
            the Where engine won’t calculate it into your final results.
          </Paragraph>
        </Score>
        <Score id={SCORES.GROCERIES}>
          <GroceriesIcon />
          <NameScore>Groceries</NameScore>
          <Paragraph>
            Score for groceries depends on the number of convenience stores,
            supermarkets, bodegas, and delis located within a walking distance
            in a given neighborhood.
          </Paragraph>
        </Score>
        <Score id={SCORES.PUBLIC_TRANSIT}>
          <PublicTransportIcon />
          <NameScore>Public transit</NameScore>
          <Paragraph>
            The Public Transit score determines how well the neighborhood is
            connected to the rest of the city based on average travel times in a
            given neighborhood, taking into account traffic volume, time, and
            means of transportation including combined transport options and
            walking distances.
          </Paragraph>
        </Score>
        <Score id={SCORES.DINING}>
          <DiningIcon />
          <NameScore>Dining out</NameScore>
          <Paragraph>
            The Dining out score is defined by number of restaurants, cafes,
            food courts, and so on that can be found within walking distance in
            a given neighborhood.
          </Paragraph>
        </Score>
        <InventoryScore id={SCORES.INVENTORY}>
          <InventoryIcon />
          <NameScore>Availability</NameScore>
          <Paragraph>
            The score for availability tells you how easy is it to find housing
            in a neighborhood based on your preferences as determined by past
            and current real estate offerings.
            <br />
            <br />
            For the most accurate results, it’s important that you answer all
            three questions about desired housing - the type, number of
            bedrooms, and budget. Without user input on these questions a score
            can’t be determined precisely.
          </Paragraph>
        </InventoryScore>
        <Score id={SCORES.AFFORDABILITY}>
          <ValueForMoneyIcon />
          <NameScore>Affordability</NameScore>
          <Paragraph>
            This score depends on current rents and real estate prices and tells
            you how much value can you get for a given budget.
          </Paragraph>
        </Score>
      </Wrapper>
    </Container>
  )
}

const SCORES = {
  SCHOOLS: 'schools',
  DIVERSITY: 'diversity',
  PROXIMITY: 'proximity',
  SOCIAL_LIFE: 'social-life',
  GROCERIES: 'groceries',
  PUBLIC_TRANSIT: 'public-transit',
  INVENTORY: 'inventory',
  DINING: 'dining',
  AFFORDABILITY: 'affordability',
}

const Container = styled.div`
  padding-top: 56px;
  padding-bottom: 112px;

  ${mobileMedia} {
    padding-top: 16px;
    padding-bottom: 48px;
  }
`
const Title = styled.div`
  margin-bottom: 24px;

  font-weight: 500;
  font-size: 42px;
  line-height: 52px;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun')};

  ${mobileMedia} {
    margin-bottom: 32px;

    font-size: 28px;
    line-height: 36px;
  }
`
const SubTitle = styled(SubTitleBase)`
  margin-bottom: 24px;

  ${mobileMedia} {
    margin-bottom: 16px;
  }
`
const Wrapper = styled(WrapperBase)`
  display: grid;
  justify-content: space-between;

  ${notMobileMedia} {
    grid-template-columns: 45% 45%;
  }
`

type ScoreProps = { id: string; children: ReactNode }
const Score: FC<ScoreProps> = ({ id, children, ...props }) => {
  return (
    <ScoreStyled {...props}>
      <HiddenAnchor id={id} />
      {children}
    </ScoreStyled>
  )
}
const HiddenAnchor = styled.div`
  position: relative;
  top: -50px;

  grid-column: 2 span;

  visibility: hidden;
`
const ScoreStyled = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
  align-items: center;
  align-content: start;

  &:not(:last-child) {
    margin-bottom: 50px;
  }

  ${mobileMedia} {
    gap: 12px;

    &:not(:last-child) {
      margin-bottom: 27px;
    }
  }
`
const InventoryScore = styled(Score)`
  ${notMobileMedia} {
    grid-row: 2 span;
  }
`
const NameScore = styled(SubTitleBase)``
const Paragraph = styled(ParagraphBase)`
  grid-column: 1 / 2 span;
`
const MainParagraph = styled(ParagraphBase)`
  margin-bottom: 74px;
  ${mobileMedia} {
    margin-bottom: 24px;
  }
`
const SpeedometerIcon = styled(SpeedometerIconBase)`
  width: 100%;
  align-self: end;

  ${notMobileMedia} {
    margin-bottom: 74px;

    grid-row: 1 / 3 span;
    grid-column: 2;
  }
  ${mobileMedia} {
    margin-bottom: 32px;

    grid-row: 2;
  }
`
const Menu = styled.ul`
  padding: 0;
  margin: 0 0 34px 0;

  list-style: none;

  ${notMobileMedia} {
    display: none;
  }
`

type MenuItemProps = {
  id: string
  children: ReactNode
}
const MenuItem: FC<MenuItemProps> = ({ id, children }) => {
  const router = useRouter()

  return (
    <MenuItemStyled>
      <Link href={`${router.asPath}/#${id}`} passHref>
        <a>{children}</a>
      </Link>
    </MenuItemStyled>
  )
}
const MenuItemStyled = styled.li`
  font-size: 16px;
  line-height: 24px;
  color: ${getColorTheme('pluto')};

  &:not(:last-child) {
    margin: 0 0 8px 0;
  }
  &:before {
    content: '•';
    margin-right: 14px;

    display: inline-block;
  }
`
