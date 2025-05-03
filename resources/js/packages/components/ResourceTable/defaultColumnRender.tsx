import day from '@/packages/lib/day.ts'
import { badgeColor } from '@/packages/lib/utils.ts'
import { Icon } from '@iconify/react'
import { Badge, Button, CopyButton, Indicator, Tooltip } from '@mantine/core'
import { useTranslation } from 'react-i18next'

function TimeAgoField({ data }) {
  return (
    <Tooltip label={day(data).format('YYYY-MM-DD HH:mm:ss')}>
      <span>{day(data).fromNow()}</span>
    </Tooltip>
  )
}

function UserField({ data }) {
  return (
    <Button size="compact-xs" variant="subtle">
      {data?.nickname}
    </Button>
  )
}

function CopyButtonField({ row, data }) {
  const { t } = useTranslation()

  return (
    <CopyButton value={row?.ip_address}>
      {({ copied, copy }) => (
        <Button
          size="compact-xs"
          variant="subtle"
          color={copied ? 'teal' : 'grape'}
          onClick={(e) => {
            e.stopPropagation()
            copy()
          }}
        >
          <Icon icon={`circle-flags:${data?.location?.country_code?.toLowerCase()}`} className="mr-1" />
          {copied ? t('copied') : row?.ip_address}
        </Button>
      )}
    </CopyButton>
  )
}

function BadgeEnumFiled({ data }) {
  const { t } = useTranslation()

  return (
    <Badge radius="sm" size="sm" color={badgeColor(data)}>
      {t(`enums.${data}`)}
    </Badge>
  )
}

function BadgeField({ data }) {
  return (
    <Badge radius="sm" size="sm" color={badgeColor(data)}>
      {data}
    </Badge>
  )
}

function BooleanFiled({ data }) {
  return <Indicator position="middle-center" size={8} color={data ? 'green' : 'red'}></Indicator>
}

export default function defaultColumnRender<T extends Record<string, any>>(
  row: T,
  _: number,
  accessor: keyof T | (string & NonNullable<unknown>),
) {
  const data = row[accessor as keyof typeof row]

  switch (accessor) {
    case 'created_at':
    case 'updated_at':
      return <TimeAgoField data={data} />
    case 'user':
      return <UserField data={data} />
    case 'ip':
      return <CopyButtonField row={row} data={data} />
    case 'status':
      return <BadgeEnumFiled data={data} />
    case 'response_status':
    case 'method':
      return <BadgeField data={data} />
    case 'successful':
      return <BooleanFiled data={data} />
    default:
      return data
  }
}
