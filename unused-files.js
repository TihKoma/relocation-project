const fs = require('fs')

const allFiles = fs
  .readFileSync('./all-files')
  .toString()
  .split('\n')
  .filter((x) => !x.includes('__generated__'))
  .filter((x) => !x.includes('stories'))
  .filter((x) => !x.includes('.test.'))
  .filter((file) => file.includes('.ts') || file.includes('.tsx'))

// console.log(
//   JSON.parse(fs.readFileSync('./webpack-stats.json').toString()).modules.filter(
//     ({ name }) => name.includes('./src/modules/post'),
//   )[1],
// )

const esedFiles = [
  ...new Set(
    JSON.parse(fs.readFileSync('./webpack-stats.json').toString())
      .modules.reduce(
        (acc, { name, reasons, modules }) => [
          ...acc,
          name,
          ...reasons.map(({ module }) => module),
          ...(modules ?? []).reduce(
            (acc, { name, reasons, modules }) => [
              ...acc,
              name,
              ...reasons.map(({ module }) => module),
              ...(modules ?? []).reduce(
                (acc, { name, reasons }) => [
                  ...acc,
                  name,
                  ...reasons.map(({ module }) => module),
                ],
                [],
              ),
            ],
            [],
          ),
        ],
        [],
      )
      .filter((x) => x)
      .map((x) => {
        const b = x.split(' ')
        return b[0]
      })
      .filter((x) => !x.startsWith('./node_modules')),
  ),
]

// eslint-disable-next-line no-console
console.log(
  allFiles.filter(
    (file) =>
      !esedFiles.includes(
        file.includes('.ts') || file.includes('.tsx')
          ? file
          : `${file}/index.ts`,
      ),
  ),
)
