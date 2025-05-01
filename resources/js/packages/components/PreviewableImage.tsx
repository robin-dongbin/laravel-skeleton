import { Icon } from '@iconify/react'
import { BackgroundImage, Overlay } from '@mantine/core'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function Modal({ opened, close, url }) {
  return (
    <Modal opened={opened} onClose={close} title="Authentication">
      <Image></Image>
    </Modal>
  )
}

export default function PreviewableImage({ url }: { url: string }) {
  const [visible, setVisible] = useState(false)
  const { t } = useTranslation()

  return (
    <BackgroundImage
      className="relative cursor-pointer overflow-hidden"
      radius="md"
      h={200}
      src={url}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {visible && (
        <Overlay center={true}>
          <p className="flex items-center justify-center gap-2 text-white">
            <Icon icon="lucide:eye" />
            <span className="text-xs">{t('actions.preview')}</span>
          </p>
        </Overlay>
      )}
    </BackgroundImage>
  )
}
