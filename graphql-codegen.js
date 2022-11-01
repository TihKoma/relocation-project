require('./env')
const { exec } = require('child_process')

exec('find ./graphql/schema.graphql', (error) => {
  if (error) {
    exec(
      'mkdir ./graphql && touch ./graphql/schema.graphql',
      (error, stdout, stderr) => {
        // eslint-disable-next-line no-console
        console.log(error ?? '', stdout, stderr)
      },
    )
  }
})

exec(
  "find ./ -type d -name '__generated__' -exec rm -rf {} +",
  (error, stdout, stderr) => {
    // eslint-disable-next-line no-console
    console.log(error ?? '', stdout, stderr)
    exec(
      `rover graph introspect ${process.env.SERVER_URL}/api/graphql > ./graphql/schema.graphql`,
      (error, stdout, stderr) => {
        // eslint-disable-next-line no-console
        console.log(error ?? '', stdout, stderr)
        exec(
          `apollo codegen:generate --target=typescript`,
          (error, stdout, stderr) => {
            // eslint-disable-next-line no-console
            console.log(error ?? '', stdout, stderr)
          },
        )
      },
    )
  },
)
