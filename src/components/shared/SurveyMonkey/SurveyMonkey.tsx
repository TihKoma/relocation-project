import Script from 'next/script'

import { monkeySurveyScript } from '@/modules/analytics'
import { useSurvey } from '@/modules/survey/SurveyContext'

export const SurveyMonkey = () => {
  const { isReadyForSurvey } = useSurvey()

  return (
    <>
      {isReadyForSurvey ? (
        <Script
          id={'surveyMonkey'}
          dangerouslySetInnerHTML={{ __html: monkeySurveyScript }}
        />
      ) : null}
    </>
  )
}
