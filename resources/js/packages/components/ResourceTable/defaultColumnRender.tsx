import { get } from 'es-toolkit/compat'
import type { ReactNode } from 'react'
import {
  BooleanField,
  ImageField,
  IpField,
  NumberField,
  TimeAgoField,
} from './Fields.tsx'

export default function defaultColumnRender<T extends Record<string, any>>(
  row: T,
  _: number,
  accessor: keyof T | (string & NonNullable<unknown>),
): ReactNode {
  const value = get(row, accessor)

  switch (accessor) {
    case 'created_at':
    case 'updated_at':
    case 'deleted_at':
    case 'handled_at':
    case 'published_at':
    case 'read_at':
    case 'latest_successful_login_at':
    case 'settled_at':
    case 'canceled_at':
    case 'used_at':
    case 'expires_at':
    case 'last_settled_at':
      return <TimeAgoField value={value} />
    case 'ip_address':
      return <IpField value={value} location={row?.ip?.location} />
    case 'successful':
      return <BooleanField value={value} />
    case 'image':
    case 'logo':
    case 'icon':
      return <ImageField value={value} />
    case 'amount':
    case 'balance':
    case 'balance_after':
    case 'money_balance':
    case 'point_balance':
    case 'deposits_sum_amount':
    case 'withdrawals_sum_amount':
    case 'user.money_balance':
    case 'metadata.latest_deposit_amount':
    case 'metadata.latest_deposit_point':
    case 'prize':
    case 'potential_payout':
    case 'payout':
    case 'stake':
    case 'prize_value':
    case 'value':
    case 'reward_point':
    case 'total_commission':
      return <NumberField value={value} />
    default:
      return value
  }
}
