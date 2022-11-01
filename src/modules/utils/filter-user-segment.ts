export const filterUserSegment = (tags: Array<string>): string | undefined => {
  if (tags.includes('team')) return 'team'
  if (tags.includes('creator')) return 'creator'
}
