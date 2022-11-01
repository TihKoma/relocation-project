export const replaceSubstring = (
  text: string,
  substring: string,
  positions: [number, number],
): { text: string; positions: [number, number] } => {
  const [start, end] = positions

  const newText = text.slice(0, start) + substring + text.slice(end)

  return {
    text: newText,
    positions: [start, start + substring.length],
  }
}
