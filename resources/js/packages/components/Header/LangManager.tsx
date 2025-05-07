import { Icon } from '@iconify/react'
import { ActionIcon, Menu } from '@mantine/core'
import i18n from 'i18next'

const languages = [
  {
    label: 'English',
    value: 'en',
  },
  {
    label: '简体中文',
    value: 'zh',
  },
]

export default function LangManager() {
  const handleChange = (value: string) => {
    i18n.changeLanguage(value)
  };

  return (
    <Menu shadow="md" width={140} withArrow>
      <Menu.Target>
        <ActionIcon variant="subtle" size="lg" radius="xl" color="none" className="text-xl">
          <Icon icon="lucide:languages" />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {languages.map((o) => (
          <Menu.Item
            key={o.value}
            leftSection={<Icon icon={`circle-flags:${o.value}`} />}
            onClick={() => handleChange(o.value)}
          >
            {o.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}
