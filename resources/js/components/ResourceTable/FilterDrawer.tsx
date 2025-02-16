import { useFilter } from '@/hooks/use-filter'
import type { Filters } from '@/types'
import { Icon } from '@iconify/react'
import { Button, Drawer, type MantineComponent, Select, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React from 'react'

const componentMap: Record<string, MantineComponent<any>> = {
  'filters.text': TextInput,
  'filters.select': Select,
}

function FilterComponent({ component, ...props }) {
  const Comp = componentMap[component]

  return <Comp {...props} />
}

export default function FilterDrawer({ filters }: Filters) {
  const query = new URLSearchParams(window.location.search)
  const [opened, { open, close }] = useDisclosure(false)
  const filter = useFilter({
    initialValues: {
      ...filters.reduce((o, { attribute }) => {
        o[attribute] = query.get(attribute) || ''
        return o
      }, {}),
    },
  })

  function onSubmit(e: React.FormEvent) {
    filter.submit(e)
    close()
  }
  function onReset(e: React.FormEvent<HTMLFormElement>) {
    filter.reset(e)
    close()
  }
  return (
    <>
      <Button variant="default" size="xs" onClick={open} leftSection={<Icon icon="lucide:filter" />}>
        Filter
      </Button>
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        title="Filters"
        classNames={{ header: 'dark:bg-dark-8 bg-gray-1' }}
      >
        <form onSubmit={onSubmit} onReset={onReset}>
          <div className="flex flex-col gap-2 py-4">
            {filters.map(({ component, title, attribute, ...props }) => (
              <FilterComponent
                key={attribute}
                component={component}
                label={title}
                placeholder={title}
                {...props}
                {...filter.getInputProps(attribute)}
              />
            ))}
          </div>
          <div className="mt-8 flex items-center justify-end gap-2">
            <Button fullWidth type="submit" loading={filter.submitting}>
              Apply
            </Button>
            <Button fullWidth variant="default" type="reset">
              Reset
            </Button>
          </div>
        </form>
      </Drawer>
    </>
  )
}
