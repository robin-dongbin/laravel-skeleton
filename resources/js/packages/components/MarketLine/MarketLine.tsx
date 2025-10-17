import { BetSelectionContext } from '@/packages/contexts/BetSelectionContext.tsx'
import {
  Type1x2,
  TypeAH,
  TypeDC,
  TypeHA,
  TypeHTFT,
  TypeOU,
  TypeRBTS,
  TypeRLOU,
  TypeRTG,
  TypeYesNo,
} from './MarketType.tsx'
import type { SelectionProps } from './Selection.tsx'

interface GameLineProps {
  marketGroup: string
  selections: SelectionProps[]
  betSelection: BetSelectionContext
}

const markets = {
  '1x2': Type1x2,
  AH: TypeAH,
  DC: TypeDC,
  HA: TypeHA,
  HTFT: TypeHTFT,
  IOU: TypeOU,
  OU: TypeOU,
  CS: TypeRBTS,
  RBTS: TypeRBTS,
  RLOU: TypeRLOU,
  RTG: TypeRTG,
  BTS: TypeYesNo,
  RUN: TypeYesNo,
} as const

export default function MarketLine({
  marketGroup,
  selections,
  betSelection,
}: GameLineProps) {
  const renderContent = () => {
    const MarketComponent = markets[marketGroup as keyof typeof markets]

    return <MarketComponent selections={selections} line={betSelection.line} />
  }

  return (
    <BetSelectionContext.Provider value={betSelection}>
      <div className="h-full">{renderContent()}</div>
    </BetSelectionContext.Provider>
  )
}
