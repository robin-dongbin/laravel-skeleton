import { Button, Image, FileButton as MantineFileButton, type FileButtonProps } from '@mantine/core'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Preview = ({ file }: { file: File | null }) => {
  if (!file) {
    return null
  }
  if (file.type.startsWith('image/')) {
    const imageUrl = URL.createObjectURL(file)
    return (
      <Image
        src={imageUrl}
        className="aspect-square h-24 w-24"
        fit="cover"
        loading="lazy"
        radius="md"
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    )
  }
}

export default function FileButton({
  children,
  ...props
}: Omit<FileButtonProps, 'onChange' | 'children'> & { children?: React.ReactNode }) {
  const { t } = useTranslation()
  const [file, setFile] = useState<File | null>(null)

  return (
    <>
      <Preview file={file} />
      <MantineFileButton onChange={setFile} {...props}>
        {(props) => <Button {...props}>{children || t('select_file')}</Button>}
      </MantineFileButton>
    </>
  )
}
