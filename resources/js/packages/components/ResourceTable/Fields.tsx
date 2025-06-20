import useEnum from '@/apps/admin/hooks/useEnum.ts'
import dayjs from '@/packages/libs/dayjs.ts'
import { badgeColor } from '@/packages/libs/utils.ts'
import { Icon } from '@iconify/react'
import { Badge, Button, CopyButton, Image, Indicator, NumberFormatter, Text, Tooltip } from '@mantine/core'
import { isObject } from 'es-toolkit/compat'
import { useTranslation } from 'react-i18next'

export const TimeAgoField = ({ value }: { value: string }) => {
  return value ? (
    <Tooltip label={dayjs(value).format('YYYY-MM-DD HH:mm:ss')}>
      <span>{dayjs(value).fromNow()}</span>
    </Tooltip>
  ) : (
    '-'
  )
}

export const IpField = ({ value, location }: { value: string; location?: { country_code: string } }) => {
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

export const EnumField = ({ name, value }: { name: string; value: number }) => {
  const { label, color } = useEnum(name, value)

  return (
    <Badge radius="sm" size="sm" color={color}>
      {label}
    </Badge>
  )
}

export const BadgeField = ({ value }: { value: string }) => (
  <Badge radius="sm" size="sm" color={badgeColor(value)}>
    {value}
  </Badge>
)

export const BooleanField = ({ value }: { value: boolean }) => (
  <Indicator position="middle-center" size={8} color={value ? 'green' : 'red'}></Indicator>
)

export const ImageField = ({ value }: { value: { id: number; url: string } }) => {
  const url = isObject(value) ? value?.url : value

  return (
    <Image
      src={url}
      className="inline-block h-16 w-16"
      radius="md"
      fallbackSrc="https://placehold.co/30x30?text=No Image"
    />
  )
}

export const NumberField = ({ value }: { value: number }) => {
  return <NumberFormatter value={value} thousandSeparator />
}

export const ColorTextField = ({ value, color }: { value: string; color: string | null }) => {
  return <Text c={color || undefined}>{value}</Text>
}

export const HtmlContentField = ({ content }: { content: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />
}
