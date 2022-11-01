import { FC, useState } from 'react'
import { useMutation } from '@apollo/client'
import styled from '@emotion/styled'

import { ReportModal } from '@/components/shared/ReportModal'
import { showSuccessToast } from '@/components/shared/Toast'
import {
  Option,
  Options as OptionsBase,
} from '@/components/ui-kit/form/Options'
import { MUTATION_SEND_COMPLAIN } from '@/modules/feed/graphql/mutations'

import { ComplaintEntityType } from '../../../../../__generated__/globalTypes'

type Props = {
  groupId: string
}

export const ReportButton: FC<Props> = ({ groupId }) => {
  const [isReportModalVisible, setIsReportModalVisible] = useState(false)

  const reportGroup = () => {
    setIsReportModalVisible(true)
  }

  const onReportRequestClose = () => {
    setIsReportModalVisible(false)
  }

  const [sendComplaint, { loading }] = useMutation(MUTATION_SEND_COMPLAIN, {
    variables: {
      // TODO change POST to GROUP, need backend
      input: { entityId: groupId, entityType: ComplaintEntityType.POST },
    },
  })

  const onReportSuccess = async () => {
    await sendComplaint()
    onReportRequestClose()
    showSuccessToast(
      'Thanks for brining this to our attention. We’ll look into the situation and take action within 24 hours',
      {
        autoClose: 2000,
      },
    )
  }

  return (
    <>
      <Options>
        <Option onClick={reportGroup}>Report</Option>
      </Options>
      <ReportModal
        isVisible={isReportModalVisible}
        onRequestClose={onReportRequestClose}
        onSuccess={onReportSuccess}
        isLoading={loading}
        text={'Are you sure you want to report this group?'}
      />
    </>
  )
}

const Options = styled(OptionsBase)`
  height: 4rem;
  width: 4rem;

  display: flex;
  align-items: center;
  justify-content: center;
`
