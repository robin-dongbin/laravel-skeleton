import JsonView from '@/packages/components/JsonView'
import type { components } from '@/types/admin'
import { Drawer, Tabs, type DrawerProps } from '@mantine/core'
import { useTranslation } from 'react-i18next'

export default function InfoDrawer({
  opened,
  onClose,
  data,
}: DrawerProps & {
  data?: components['schemas']['RequestLogResource']
}) {
  const { t } = useTranslation()

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      size="xl"
      classNames={{ title: 'truncate' }}
      title={`${t('actions.view')}${t('navigation.request')} - ${data?.id}`}
    >
      {data ? (
        <div className="">
          <Tabs defaultValue="payload">
            <Tabs.List>
              <Tabs.Tab value="payload">{t('fields.request_logs.payload')}</Tabs.Tab>
              <Tabs.Tab value="headers">{t('fields.request_logs.headers')}</Tabs.Tab>
              <Tabs.Tab value="response">{t('fields.request_logs.response')}</Tabs.Tab>
            </Tabs.List>

            <div className="py-4">
              <Tabs.Panel value="payload">
                <JsonView src={data.payload} />
              </Tabs.Panel>

              <Tabs.Panel value="headers">
                <JsonView src={data.headers} />
              </Tabs.Panel>

              <Tabs.Panel value="response">
                <JsonView src={data.response} />
              </Tabs.Panel>
            </div>
          </Tabs>
        </div>
      ) : null}
    </Drawer>
  )
}
