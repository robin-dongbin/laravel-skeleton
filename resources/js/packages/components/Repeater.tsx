import { Icon } from '@iconify/react/dist/iconify.js'
import {
  Button,
  CloseButton,
  Fieldset,
  Input,
  type InputWrapperProps,
} from '@mantine/core'
import type { UseFormReturnType } from '@mantine/form'
import { randomId } from '@mantine/hooks'

interface RepeaterProps<T>
  extends Omit<InputWrapperProps, 'children' | 'defaultValue'> {
  form: UseFormReturnType<any>
  defaultValue?: T
  field: string
  items: (index: number) => React.ReactNode
}

export default function Repeater<T>({
  form,
  field,
  defaultValue,
  items,
  ...props
}: RepeaterProps<T>) {
  const fields = form
    .getValues()
    [field].map((item: T) => ({ key: randomId(), ...item }))

  const addItem = () => {
    form.insertListItem(field, { key: randomId(), ...defaultValue })
  }

  const removeItem = (index: number) => {
    form.removeListItem(field, index)
  }

  return (
    <Input.Wrapper {...props}>
      <div className="flex flex-col gap-2">
        {fields.map((item: T & { key: string }, index: number) => (
          <Fieldset key={item.key} className="relative">
            {items(index)}
            <CloseButton
              className="absolute top-0 right-0"
              onClick={() => removeItem(index)}
            />
          </Fieldset>
        ))}
        <Button
          size="xs"
          variant="light"
          leftSection={<Icon icon="lucide:plus" />}
          fullWidth
          onClick={addItem}
        >
          ADD
        </Button>
      </div>
    </Input.Wrapper>
  )
}
