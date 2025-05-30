import dayjs from '@/packages/libs/dayjs.ts'
import { badgeColor } from '@/packages/libs/utils.ts'
import { Icon } from '@iconify/react'
import { Badge, Button, CopyButton, Image, Indicator, Tooltip } from '@mantine/core'
import { get } from 'es-toolkit/compat'
import { useTranslation } from 'react-i18next'

const TimeAgoField = ({ value }: { value: string }) => (
  <Tooltip label={dayjs(value).format('YYYY-MM-DD HH:mm:ss')}>
    <span>{dayjs(value).fromNow()}</span>
  </Tooltip>
)

const IpField = ({ value, location }: { value: string; location?: { country_code: string } }) => {
  const { t } = useTranslation()

  return (
    <CopyButton value={value}>
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
          {location && <Icon icon={`circle-flags:${location.country_code?.toLowerCase()}`} className="mr-1" />}
          {copied ? t('copied') : value}
        </Button>
      )}
    </CopyButton>
  )
}

const BadgeEnumField = ({ value }: { value: string }) => {
  const { t } = useTranslation()

  return (
    <Badge radius="sm" size="sm" color={badgeColor(value)}>
      {t(`enums.${value}`)}
    </Badge>
  )
}

const BadgeField = ({ value }: { value: string }) => (
  <Badge radius="sm" size="sm" color={badgeColor(value)}>
    {value}
  </Badge>
)

const BooleanField = ({ value }: { value: boolean }) => (
  <Indicator position="middle-center" size={8} color={value ? 'green' : 'red'}></Indicator>
)

const ImageField = ({ value }: { value: { id: number; url: string } }) => (
  <Image
    src={value?.url}
    className="inline-block h-16 w-16"
    radius="md"
    fallbackSrc="https://placehold.co/30x30?text=No Image"
  />
)

export default function defaultColumnRender<T extends Record<string, any>>(
  row: T,
  _: number,
  accessor: keyof T | (string & NonNullable<unknown>),
) {
  const value = get(row, accessor)

  switch (accessor) {
    case 'created_at':
    case 'updated_at':
      return <TimeAgoField value={value} />
    case 'ip_address':
      return <IpField value={value} location={row?.ip?.location} />
    case 'status_display':
      return <BadgeEnumField value={value} />
    case 'response_status':
    case 'method':
      return <BadgeField value={value} />
    case 'successful':
    case 'enabled':
      return <BooleanField value={value} />
    case 'image':
      return <ImageField value={value} />
    default:
      return value
  }
}
