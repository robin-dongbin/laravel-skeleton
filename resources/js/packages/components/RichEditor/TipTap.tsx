import { Input, type InputWrapperProps } from '@mantine/core'
import { useUncontrolled } from '@mantine/hooks'
import { Link, RichTextEditor } from '@mantine/tiptap'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyleKit } from '@tiptap/extension-text-style'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ImageResize from 'tiptap-extension-resize-image'
import ImageControl from './ImageControl.tsx'

interface RichEditorProps
  extends Omit<InputWrapperProps, 'defaultValue' | 'onChange'> {
  defaultValue?: string
  onChange?: (value: string) => void
}

export default function TipTap({
  defaultValue,
  onChange,
  ...props
}: RichEditorProps) {
  const [value, handleChange] = useUncontrolled<string>({
    defaultValue,
    onChange,
  })

  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: false }),
      TextStyleKit.configure(),
      Link,
      Highlight,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      ImageResize,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML())
    },
  })

  return (
    <Input.Wrapper {...props}>
      <RichTextEditor editor={editor} variant="subtle">
        <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
            <RichTextEditor.ColorPicker
              colors={[
                '#25262b',
                '#868e96',
                '#fa5252',
                '#e64980',
                '#be4bdb',
                '#7950f2',
                '#4c6ef5',
                '#228be6',
                '#15aabf',
                '#12b886',
                '#40c057',
                '#82c91e',
                '#fab005',
                '#fd7e14',
              ]}
            />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <ImageControl />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </Input.Wrapper>
  )
}
