export function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div role={'alert'} css={{ padding: '32px' }}>
      <h1>Something went wrong:</h1>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}
