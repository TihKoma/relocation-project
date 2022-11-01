import { FC, SVGProps } from 'react'
import { useId } from 'react'

export const PlaceholderMarkerIcon: FC<
  SVGProps<SVGSVGElement> & { title?: string }
> = (props) => {
  const id = useId()
  return (
    <svg
      width={'148'}
      height={'148'}
      viewBox={'0 0 148 148'}
      fill={'none'}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <g clip-path={`url(#clip0_55_${id})`}>
        <path
          d={
            'M129.031 85.2905C115.387 108.923 99.8084 82.9324 61.458 103.331C23.1075 123.73 32.2425 54.9337 43.2948 35.7905C54.3472 16.6474 84.5456 2.55264 110.868 17.75C137.191 32.9473 142.676 61.658 129.031 85.2905Z'
          }
          fill={`url(#paint0_linear_55_${id})`}
        />
        <path
          d={
            'M58.6674 35.1461C85.956 35.1461 71.2367 61.633 108.078 84.6461C144.919 107.659 80.772 134.146 58.6674 134.146C36.5628 134.146 9.25718 115.041 9.25716 84.6461C9.25715 54.2514 31.3789 35.1461 58.6674 35.1461Z'
          }
          fill={`url(#paint1_linear_55_${id})`}
        />
        <path
          fill-rule={'evenodd'}
          clip-rule={'evenodd'}
          d={
            'M56.3691 40.9286C67.4755 34.4753 81.127 34.5881 92.1291 41.224C103.023 47.9951 109.644 60.0796 109.583 73.079C109.329 85.9932 102.229 98.1325 93.3547 107.517C88.2325 112.958 82.5025 117.769 76.2816 121.852C75.6409 122.222 74.9392 122.47 74.2109 122.583C73.51 122.553 72.8274 122.346 72.2247 121.981C62.7274 115.846 54.3953 108.015 47.6294 98.8643C41.9678 91.2261 38.7513 81.998 38.4167 72.4333C38.4093 59.4089 45.2627 47.3819 56.3691 40.9286ZM62.787 77.8234C64.6552 82.4292 69.065 85.4335 73.9573 85.4335C77.1623 85.4566 80.2433 84.1728 82.5136 81.8682C84.7839 79.5637 86.055 76.4299 86.0436 73.1651C86.0607 68.1817 83.1269 63.6792 78.6119 61.7601C74.0969 59.8409 68.8914 60.8836 65.426 64.4012C61.9606 67.9189 60.9187 73.2177 62.787 77.8234Z'
          }
          fill={`url(#paint2_linear_55_${id})`}
        />
        <ellipse
          opacity={'0.5'}
          cx={'74'}
          cy={'132.75'}
          rx={'25.4167'}
          ry={'5.08334'}
          fill={'#3F37C9'}
        />
      </g>
      <defs>
        <linearGradient
          id={`paint0_linear_55_${id}`}
          x1={'43.5026'}
          y1={'100.007'}
          x2={'122.919'}
          y2={'13.9643'}
          gradientUnits={'userSpaceOnUse'}
        >
          <stop offset={'0.0138835'} stop-color={'white'} stop-opacity={'0'} />
          <stop offset={'1'} stop-color={'#75FBDC'} />
        </linearGradient>
        <linearGradient
          id={`paint1_linear_55_${id}`}
          x1={'114.177'}
          y1={'101.858'}
          x2={'-0.0465745'}
          y2={'76.1029'}
          gradientUnits={'userSpaceOnUse'}
        >
          <stop offset={'0.0138835'} stop-color={'white'} stop-opacity={'0'} />
          <stop offset={'1'} stop-color={'#75FBDC'} />
        </linearGradient>
        <linearGradient
          id={`paint2_linear_55_${id}`}
          x1={'74'}
          y1={'123'}
          x2={'77.2652'}
          y2={'48.1424'}
          gradientUnits={'userSpaceOnUse'}
        >
          <stop stop-color={'#5D54E6'} stop-opacity={'0'} />
          <stop offset={'1'} stop-color={'#5D54E6'} />
        </linearGradient>
        <clipPath id={`clip0_55_${id}`}>
          <rect width={'148'} height={'148'} fill={'white'} />
        </clipPath>
      </defs>
    </svg>
  )
}
