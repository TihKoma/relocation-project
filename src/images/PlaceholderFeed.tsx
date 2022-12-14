import * as React from 'react'
import { useId } from 'react'

export const PlaceholderFeedIcon: React.FC<
  React.SVGProps<SVGSVGElement> & { title?: string }
> = (props) => {
  const id = useId()
  return (
    <svg
      width={108}
      viewBox={'0 15 100 70'}
      fill={'none'}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <circle
        cx={54.001}
        cy={54}
        r={41.595}
        fill={`url(#placeholder-feed_svg__a${id})`}
      />
      <path
        d={
          'M27.446 40.865c-13.375 0-23.067 10.912-23.067 23.02 0 3.868 1.128 7.85 3.108 11.488.368.599.414 1.358.16 2.072l-1.542 5.157c-.345 1.243.714 2.164 1.888 1.795l4.65-1.38c1.267-.415 2.256.114 3.433.828 3.361 1.98 7.549 2.993 11.324 2.993 11.418 0 23.02-8.817 23.02-23.021 0-12.248-9.898-22.952-22.974-22.952Z'
        }
        fill={`url(#placeholder-feed_svg__b${id})`}
      />
      <path
        fill-rule={'evenodd'}
        clip-rule={'evenodd'}
        d={
          'M27.355 66.856a2.972 2.972 0 0 1-2.946-2.97c0-1.611 1.335-2.947 2.946-2.924a2.938 2.938 0 0 1 2.947 2.947 2.952 2.952 0 0 1-2.947 2.947Zm-10.613 0a2.967 2.967 0 0 1-2.947-2.946 2.938 2.938 0 0 1 2.947-2.946 2.938 2.938 0 0 1 2.946 2.946c0 1.612-1.312 2.924-2.946 2.947ZM35.02 63.91a2.952 2.952 0 0 0 2.947 2.947 2.952 2.952 0 0 0 2.946-2.947 2.938 2.938 0 0 0-2.946-2.946 2.938 2.938 0 0 0-2.947 2.946Z'
        }
        fill={'#fff'}
      />
      <path
        d={
          'M79.556 71.374v-.93c0-1.404.33-2.596.99-3.576.693-1.012 1.766-2.024 3.218-3.037.264-.196.759-.522 1.485-.98.759-.456 1.27-.783 1.534-.979.297-.228.594-.571.891-1.029.297-.49.446-1.012.446-1.567 0-.98-.347-1.73-1.04-2.253-.693-.555-1.55-.833-2.574-.833a4.358 4.358 0 0 0-2.87 1.029c-.793.653-1.189 1.584-1.189 2.792h-7.474c0-3.07 1.105-5.682 3.316-7.837 2.244-2.188 4.983-3.282 8.217-3.282 3.168 0 5.808.996 7.92 2.988 2.112 1.959 3.168 4.277 3.168 6.955 0 1.829-.297 3.413-.89 4.751-.595 1.307-1.717 2.547-3.367 3.723l-1.435 1.029c-.561.424-.974.734-1.238.93-.264.196-.544.425-.841.686-.297.261-.512.506-.644.735a1.392 1.392 0 0 0-.148.637v.049h-7.475Zm7.425 11.756c-1.023 1.013-2.26 1.519-3.712 1.519-1.452 0-2.706-.507-3.762-1.519-1.023-1.045-1.535-2.286-1.535-3.722 0-1.437.512-2.662 1.535-3.674 1.056-1.045 2.31-1.567 3.762-1.567s2.69.522 3.712 1.567c1.056 1.012 1.584 2.237 1.584 3.674 0 1.436-.528 2.677-1.584 3.722Z'
        }
        fill={`url(#placeholder-feed_svg__c${id})`}
      />
      <defs>
        <linearGradient
          id={`placeholder-feed_svg__a${id}`}
          x1={45.609}
          y1={87.203}
          x2={59.839}
          y2={12.405}
          gradientUnits={'userSpaceOnUse'}
        >
          <stop offset={0.014} stop-color={'#fff'} stop-opacity={0} />
          <stop offset={1} stop-color={'#75FBDC'} />
        </linearGradient>
        <linearGradient
          id={`placeholder-feed_svg__b${id}`}
          x1={-6.847}
          y1={63.317}
          x2={50.352}
          y2={56.902}
          gradientUnits={'userSpaceOnUse'}
        >
          <stop stop-color={'#5D54E6'} stop-opacity={0} />
          <stop offset={1} stop-color={'#5D54E6'} />
        </linearGradient>
        <linearGradient
          id={`placeholder-feed_svg__c${id}`}
          x1={67.457}
          y1={66.354}
          x2={95.772}
          y2={64.349}
          gradientUnits={'userSpaceOnUse'}
        >
          <stop stop-color={'#5D54E6'} stop-opacity={0} />
          <stop offset={1} stop-color={'#5D54E6'} />
        </linearGradient>
      </defs>
    </svg>
  )
}
