export function omitEmptyFormValues<Type extends Record<string, any>>(
  values: Type,
) {
  return Object.fromEntries(
    Object.entries(values).filter(([, value]) => Boolean(value)),
  ) as Partial<Type>
}
