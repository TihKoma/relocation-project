import { FC } from 'react'

export type ExtendPropsFCDeprecated<T> = T extends FC<infer Props>
  ? Props
  : never

type Patch<T extends object, PATCH, A extends keyof T> = Omit<T, A> & {
  [P in A]: Extract<T[P], any> extends null ? PATCH | null : PATCH
}

export type PatchPath<
  T extends object,
  PATCH,
  A extends keyof T,
  B extends { [P in A]: keyof Extract<T[P], object> }[A] = never,
> = B extends never
  ? Patch<T, PATCH, A>
  : Omit<T, A> & {
      [P in A]: Extract<T[P], object> extends object
        ? Exclude<T[P], object> extends never
          ? Patch<Extract<T[P], object>, PATCH, B>
          : Patch<Extract<T[P], object>, PATCH, B> | Exclude<T[P], object>
        : never
    }
