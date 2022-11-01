import { FC, SVGProps } from 'react'
import { useId } from 'react'

export const PlaceholderEyeIcon: FC<
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
            'M35.0853 79.7133C42.299 51.6301 80.8917 22.9336 98.9962 41.9258C117.101 60.918 81.0636 76.3213 118.381 101.11C155.698 125.898 100.956 150.838 72.8728 143.624C44.7896 136.41 27.8715 107.797 35.0853 79.7133Z'
          }
          fill={`url(#paint0_linear_55_${id})`}
        />
        <ellipse
          cx={'46.8133'}
          cy={'72.0518'}
          rx={'37.9799'}
          ry={'38.2185'}
          fill={`url(#paint1_linear_55_${id})`}
        />
        <path
          opacity={'0.4'}
          d={
            'M91.313 121.969C89.8377 121.921 88.4347 121.314 87.3854 120.27L78.3912 109.757C76.4629 107.993 76.3052 104.996 78.0377 103.038C78.8486 102.217 79.9512 101.756 81.1012 101.756C82.2513 101.756 83.3538 102.217 84.1648 103.038L95.4763 112.088C97.1056 113.756 97.6084 116.232 96.7599 118.409C95.9114 120.586 93.8702 122.058 91.5487 122.167L91.313 121.969Z'
          }
          fill={`url(#paint2_linear_55_${id})`}
        />
        <path
          fill-rule={'evenodd'}
          clip-rule={'evenodd'}
          d={
            'M62.7756 55.6267C67.4707 59.2507 71.4683 64.56 74.339 71.2C74.5537 71.704 74.5537 72.2933 74.339 72.7733C68.5976 86.0533 58.3756 94 47 94H46.9732C35.6244 94 25.4024 86.0533 19.661 72.7733C19.4463 72.2933 19.4463 71.704 19.661 71.2C25.4024 57.9173 35.6244 50 46.9732 50H47C52.6878 50 58.0805 51.9733 62.7756 55.6267ZM36.2682 72C36.2682 77.8667 41.0707 82.64 47 82.64C52.9024 82.64 57.7048 77.8667 57.7048 72C57.7048 66.1067 52.9024 61.3333 47 61.3333C41.0707 61.3333 36.2682 66.1067 36.2682 72Z'
          }
          fill={'white'}
        />
        <path
          d={
            'M53.685 71.9914C53.685 75.6448 50.6802 78.6314 47.0046 78.6314C43.3021 78.6314 40.2972 75.6448 40.2972 71.9914C40.2972 71.5381 40.3509 71.1141 40.4314 70.6874H40.5655C43.5436 70.6874 45.9582 68.3408 46.0655 65.4048C46.3607 65.3541 46.6826 65.3248 47.0046 65.3248C50.6802 65.3248 53.685 68.3114 53.685 71.9914Z'
          }
          fill={'#3F37C9'}
        />
      </g>
      <defs>
        <linearGradient
          id={`paint0_linear_55_${id}`}
          x1={'136.787'}
          y1={'105.837'}
          x2={'22.8878'}
          y2={'101.293'}
          gradientUnits={'userSpaceOnUse'}
        >
          <stop stop-color={'white'} stop-opacity={'0'} />
          <stop offset={'1'} stop-color={'#75FBDC'} />
        </linearGradient>
        <linearGradient
          id={`paint1_linear_55_${id}`}
          x1={'-9.68712'}
          y1={'71.163'}
          x2={'84.6973'}
          y2={'60.6597'}
          gradientUnits={'userSpaceOnUse'}
        >
          <stop stop-color={'#5D54E6'} stop-opacity={'0'} />
          <stop offset={'1'} stop-color={'#5D54E6'} />
        </linearGradient>
        <linearGradient
          id={`paint2_linear_55_${id}`}
          x1={'77'}
          y1={'102'}
          x2={'92.4827'}
          y2={'116.518'}
          gradientUnits={'userSpaceOnUse'}
        >
          <stop offset={'0.322917'} stop-color={'#5D54E6'} stop-opacity={'0'} />
          <stop offset={'1'} stop-color={'#5D54E6'} />
        </linearGradient>
        <clipPath id={`clip0_55_${id}`}>
          <rect width={'148'} height={'148'} fill={'white'} />
        </clipPath>
      </defs>
    </svg>
  )
}
