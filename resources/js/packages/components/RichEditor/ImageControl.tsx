import { $api } from '@/apps/admin/libs/request.ts'
import { bodySerializer } from '@/packages/libs/utils.ts'
import { Icon } from '@iconify/react'
import { Input } from '@mantine/core'
import { useForm } from '@mantine/form'
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap'
import { useCallback, useRef } from 'react'

export default function ImageControl() {
  const { editor } = useRichTextEditorContext()
  const inputRef = useRef<HTMLInputElement>(null)

  const { mutate: uploadImage, isPending } = $api.useMutation(
    'post',
    '/attachments',
    {
      onSuccess: (data) => {
        editor?.commands.setImage({ src: data.data?.file!.url })
        // 调整100% 尺寸为原始图片大小尺寸
        editor?.commands.updateAttributes('image', {
          style: 'width: auto; height: auto; cursor: pointer;',
        })
      },
    },
  )

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      caption: '',
      file: null as File | null,
    },
    transformValues: (values) => ({
      file: values.file as unknown as string,
    }),
  })

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!editor || !file) {
        return
      }

      form.setValues({ file })

      try {
        uploadImage({
          body: { ...form.getTransformedValues() },
          bodySerializer,
        })
      } finally {
        e.target.value = ''
      }
    },
    [editor, form, uploadImage],
  )

  return (
    <>
      <Input
        type="file"
        ref={inputRef}
        accept="image/png,image/jpeg,image/gif"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
        disabled={isPending || !editor?.isEditable}
      />
      <RichTextEditor.Control
        onClick={() => !isPending && inputRef.current?.click()}
        aria-label="Upload iamge"
        title="Upload iamge"
      >
        <Icon width={20} icon={'lucide:image'} />
      </RichTextEditor.Control>
    </>
  )
}
