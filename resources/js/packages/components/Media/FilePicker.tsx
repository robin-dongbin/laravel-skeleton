import {
  Button,
  FileButton,
  type FileButtonProps,
  Input,
  type InputWrapperProps,
  Text,
} from '@mantine/core'
import { useUncontrolled } from '@mantine/hooks'
import { useTranslation } from 'react-i18next'

interface FilePickerProps<Multiple extends boolean = false>
  extends Omit<InputWrapperProps, 'onChange'>,
    Omit<FileButtonProps<Multiple>, 'onChange' | 'children'> {
  multiple?: Multiple
  children?: React.ReactNode
  trigger?: (props: { onClick: () => void }) => React.ReactNode
  onChange?: (value: Multiple extends true ? File[] : File | null) => void
}

export default function FilePicker<Multiple extends boolean = false>({
  accept,
  multiple,
  trigger,
  children,
  onChange,
  ...props
}: FilePickerProps<Multiple>) {
  const { t } = useTranslation()

  const [file, handleChange] = useUncontrolled<
    Multiple extends true ? File[] : File | null
  >({
    defaultValue: (multiple ? [] : null) as Multiple extends true
      ? File[]
      : File | null,
    onChange,
  })

  return (
    <Input.Wrapper {...props}>
      <div className={`flex flex-col gap-2 ${props.error ? 'mb-1' : ''}`}>
        {children}
        <div className="flex items-center gap-4">
          <FileButton
            onChange={handleChange}
            accept={accept}
            multiple={multiple}
          >
            {(props) =>
              trigger?.(props) || (
                <Button {...props}>{t('actions.choose_file')}</Button>
              )
            }
          </FileButton>
          <Text size="sm" truncate className="flex-1">
            {Array.isArray(file)
              ? file.length > 0 && file.map((f) => f.name).join(', ')
              : file?.name}
          </Text>
        </div>
      </div>
    </Input.Wrapper>
  )
}
