import styled from '@emotion/styled'

import { PageBottomSheet as PageBottomSheetBase } from '@/components/shared/AreaLayout/PageBottomSheet'
import { HeaderModel } from '@/components/shared/AreaLayout/shared'
import {
  useOnScrollProvider,
  withInfinityScroll,
} from '@/modules/infinity-scroll'
import { notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

// @ts-ignore
export const SheetMobile: typeof PageBottomSheet = withInfinityScroll(
  (props) => {
    const infinityScroll = useOnScrollProvider()
    return (
      <PageBottomSheet
        {...props}
        onScroll={(e) => {
          //@ts-ignore
          props.onScrollHandler?.(e)
          infinityScroll(e)
        }}
      />
    )
  },
)

const PageBottomSheet = styled(PageBottomSheetBase)<{
  mode: HeaderModel['theme']
}>`
  ${notMobileMedia} {
    display: none;
  }

  [data-rsbs-scroll] {
    background: ${(props) =>
      getColorTheme(props.mode === 'light' ? 'earth' : 'sun50')};
    border-radius: 2.4rem 2.4rem 0 0;
  }
  [data-rsbs-overlay] {
    border-radius: 2.4rem 2.4rem 0 0;
  }
  [data-rsbs-header] {
    padding: 0;

    position: initial;
    top: initial;

    z-index: initial;
  }
`
