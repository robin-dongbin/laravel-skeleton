import { Icon } from '@iconify/react'
import { ActionIcon, Button, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React from 'react'

export default function FilterDrawer({
  children,
  onSubmit,
  onReset,
}: {
  children: React.ReactNode
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onReset: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  const [opened, { open, close }] = useDisclosure(false)

  function submit(event: React.FormEvent<HTMLFormElement>) {
    onSubmit(event)
    close()
  }

  function reset(event: React.FormEvent<HTMLFormElement>) {
    onReset(event)
    close()
  }

  return (
    <>
      <ActionIcon variant="subtle" color="none" onClick={open}>
        <Icon icon="lucide:filter" />
      </ActionIcon>
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        title="Filters"
        classNames={{ header: 'dark:bg-dark-8 bg-gray-1' }}
      >
        <form onSubmit={submit} onReset={reset}>
          <div className="flex flex-col gap-2 py-4">{children}</div>
          <div className="mt-8 flex items-center justify-end gap-2">
            <Button fullWidth type="submit">
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
