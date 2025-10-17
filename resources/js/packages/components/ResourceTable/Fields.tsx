import useEnum from '@/apps/admin/hooks/useEnum.ts'
import dayjs from '@/packages/libs/dayjs.ts'
import { Icon } from '@iconify/react'
import {
  Badge,
  Button,
  CopyButton,
  Image,
  NumberFormatter,
  Switch,
  type SwitchProps,
  Text,
  ThemeIcon,
  Tooltip,
} from '@mantine/core'
import { useInterval } from '@mantine/hooks'
import { isObject } from 'es-toolkit/compat'
import {
  type ChangeEvent,
  startTransition,
  useEffect,
  useOptimistic,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'

export const TimeAgoField = ({ value }: { value: string }) => {
  const [timeAgo, setTimeAgo] = useState(dayjs(value).fromNow())

  useEffect(() => {
    setTimeAgo(dayjs(value).fromNow())
  }, [value])

  useInterval(
    () => {
      setTimeAgo(dayjs(value).fromNow())
    },
    10000,
    { autoInvoke: true },
  )

  return value ? (
    <Tooltip label={dayjs(value).format('YYYY-MM-DD HH:mm:ss')}>
      <span>{timeAgo}</span>
    </Tooltip>
  ) : (
    '-'
  )
}
export const IpField = ({
  value,
  location,
}: {
  value: string
  location?: { country_code: string }
}) => {
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
          {location && (
            <Icon
              icon={`circle-flags:${location.country_code?.toLowerCase()}`}
              className="mr-1"
            />
          )}
          {copied ? t('copied') : value}
        </Button>
      )}
    </CopyButton>
  )
}

export const EnumField = ({
  name,
  value,
  ...props
}: {
  name: string
  value: number | string
} & React.ComponentPropsWithoutRef<'div'>) => {
  const { getItemByValue } = useEnum(name)

  const item = getItemByValue(value)

  return (
    <Badge radius="sm" size="sm" color={item?.color} {...props}>
      {item?.label}
    </Badge>
  )
}

export const BooleanField = ({ value }: { value: boolean }) => {
  return (
    <ThemeIcon radius="xl" size="xs" color={value ? 'green' : 'red'}>
      <Icon icon={value ? 'lucide:check' : 'lucide:x'} />
    </ThemeIcon>
  )
}

export const ImageField = ({
  value,
}: {
  value: { id: number; url: string }
}) => {
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

export const ColorNumberField = ({
  value,
  className,
}: {
  value: number
  className?: string
}) => {
  return (
    <Text c={value >= 0 ? 'green' : 'red'} size="sm" className={className}>
      <NumberFormatter value={value} thousandSeparator />
    </Text>
  )
}

export const ColorTextField = ({
  value,
  color,
}: {
  value: string | number
  color: string | null
}) => {
  return (
    <Text c={color || undefined} size="sm">
      {value}
    </Text>
  )
}

export const HtmlContentField = ({ content }: { content: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />
}

export const AmountFrequencyField = ({
  amount,
  count,
  isColor = false,
}: {
  amount: number
  count: number
  isColor?: boolean
}) => {
  const textColor = isColor ? (amount >= 0 ? 'green' : 'red') : undefined

  return (
    <Text c={textColor} size="sm">
      <NumberFormatter value={amount} thousandSeparator />/
      <NumberFormatter value={count} thousandSeparator />
    </Text>
  )
}

export const SwitchField = ({
  defaultChecked,
  onToggle,
}: Omit<SwitchProps, 'onToggle'> & {
  onToggle: (checked: boolean) => Promise<void>
}) => {
  const [checked, setChecked] = useState(defaultChecked)
  const [optimisticChecked, updateOptimisticChecked] = useOptimistic(checked)

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    startTransition(async () => {
      const state = event.currentTarget.checked
      updateOptimisticChecked(state)

      await onToggle(state)
      setChecked(state)
    })
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Switch
        className="inline-block"
        checked={optimisticChecked}
        onChange={handleChange}
      />
    </div>
  )
}
