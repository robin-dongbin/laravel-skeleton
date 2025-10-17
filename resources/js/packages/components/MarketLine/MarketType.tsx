import { useMemo } from 'react'
import Selection, { type SelectionProps } from './Selection'

export type MarketTypeProps = {
  line?: number | string
  selections: SelectionProps[]
}

export const Type1x2 = ({ selections }: MarketTypeProps) => {
  const home = useMemo(
    () =>
      selections.find((o) => o.key === '1') ?? { name: '1', key: '1', odds: 1 },
    [selections],
  )
  const draw = useMemo(
    () =>
      selections.find((o) => o.key === 'X') ?? { name: 'X', key: 'X', odds: 1 },
    [selections],
  )
  const away = useMemo(
    () =>
      selections.find((o) => o.key === '2') ?? { name: '2', key: '2', odds: 1 },
    [selections],
  )

  return (
    <div className="grid grid-cols-3 gap-px">
      <Selection data={home} />
      <Selection data={draw} />
      <Selection data={away} />
    </div>
  )
}

export const TypeAH = ({ line, selections }: MarketTypeProps) => {
  const home = useMemo(
    () =>
      selections.find((o) => o.key === '1') ?? { name: '1', key: '1', odds: 1 },
    [selections],
  )
  const away = useMemo(
    () =>
      selections.find((o) => o.key === '2') ?? { name: '2', key: '2', odds: 1 },
    [selections],
  )

  return (
    <div className="grid grid-cols-12 gap-px">
      <Selection data={home} className="col-span-5" />
      <div className="bg-gray-1 dark:bg-dark-6 col-span-2 flex items-center justify-center">
        {line}
      </div>
      <Selection data={away} className="col-span-5" />
    </div>
  )
}

export const TypeDC = ({ selections }: MarketTypeProps) => {
  const home = useMemo(
    () =>
      selections.find((o) => o.key === '1') ?? { name: '1', key: '1', odds: 1 },
    [selections],
  )
  const draw = useMemo(
    () =>
      selections.find((o) => o.key === 'X') ?? { name: 'X', key: 'X', odds: 1 },
    [selections],
  )
  const away = useMemo(
    () =>
      selections.find((o) => o.key === '2') ?? { name: '2', key: '2', odds: 1 },
    [selections],
  )

  return (
    <div className="grid grid-cols-3 gap-px">
      <Selection data={home} />
      <Selection data={draw} />
      <Selection data={away} />
    </div>
  )
}

export const TypeHA = ({ selections }: MarketTypeProps) => {
  const home = useMemo(
    () =>
      selections.find((o) => o.key === '1') ?? { name: '1', key: '1', odds: 1 },
    [selections],
  )
  const away = useMemo(
    () =>
      selections.find((o) => o.key === '2') ?? { name: '2', key: '2', odds: 1 },
    [selections],
  )

  return (
    <div className="grid grid-cols-2 gap-px">
      <Selection data={home} />
      <Selection data={away} />
    </div>
  )
}

export const TypeHTFT = ({ selections }: MarketTypeProps) => {
  return (
    <div className="grid grid-cols-3 gap-px">
      {selections.map((selection) => (
        <Selection key={selection.key} data={selection} />
      ))}
    </div>
  )
}

export const TypeOU = ({ line, selections }: MarketTypeProps) => {
  const home = useMemo(
    () =>
      selections.find((o) => o.key === 'Over') ?? {
        name: 'Over',
        key: 'Over',
        odds: 1,
      },
    [selections],
  )
  const away = useMemo(
    () =>
      selections.find((o) => o.key === 'Under') ?? {
        name: 'Under',
        key: 'Under',
        odds: 1,
      },
    [selections],
  )

  return (
    <div className="grid grid-cols-12 gap-px">
      <Selection data={home} className="col-span-5" />
      <div className="bg-gray-1 dark:bg-dark-6 col-span-2 flex items-center justify-center">
        {line}
      </div>
      <Selection data={away} className="col-span-5" />
    </div>
  )
}

export const TypeRBTS = ({ selections }: MarketTypeProps) => {
  return (
    <div className="grid grid-cols-3 gap-px">
      {selections.map((selection) => (
        <Selection key={selection.key} data={selection} />
      ))}
    </div>
  )
}

export const TypeRLOU = ({ selections }: MarketTypeProps) => {
  const _selections = useMemo(
    () => selections.toReversed().slice(0, 4),
    [selections],
  )

  return (
    <div className="grid grid-cols-1 gap-px">
      {_selections &&
        _selections.map((selection) => (
          <Selection key={selection.key} data={selection} />
        ))}
    </div>
  )
}

export const TypeRTG = ({ line, selections }: MarketTypeProps) => {
  return (
    <div className="grid grid-cols-12 gap-px">
      <div className="col-span-5 flex flex-col gap-px">
        <Selection data={selections[0]!} />
        <Selection data={selections[1]!} />
      </div>
      <div className="bg-gray-1 dark:bg-dark-6 col-span-2 flex items-center justify-center">
        {line}
      </div>
      <div className="col-span-5 flex flex-col gap-px">
        <Selection data={selections[2]!} />
        <Selection data={selections[3]!} />
      </div>
    </div>
  )
}

export const TypeYesNo = ({ selections }: MarketTypeProps) => {
  return (
    <div className="grid grid-cols-2 gap-px">
      <Selection data={selections[0]!} />
      <Selection data={selections[1]!} />
    </div>
  )
}
