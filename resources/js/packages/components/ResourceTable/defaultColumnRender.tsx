import { get } from 'es-toolkit/compat'
import type { ReactNode } from 'react'
import { BadgeField, BooleanField, ImageField, IpField, NumberField, TimeAgoField } from './Fields.tsx'

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
      return <TimeAgoField value={value} />
    case 'ip_address':
      return <IpField value={value} location={row?.ip?.location} />
    case 'response_status':
    case 'method':
      return <BadgeField value={value} />
    case 'successful':
      return <BooleanField value={value} />
    case 'image':
    case 'logo':
    case 'icon':
      return <ImageField value={value} />
    case 'amount':
    case 'balance':
    case 'balance_after':
      return <NumberField value={value} />
    default:
      return value
  }
}
