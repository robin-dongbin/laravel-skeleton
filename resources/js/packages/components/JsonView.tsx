import { useComputedColorScheme } from '@mantine/core'
import ReactJsonView from '@microlink/react-json-view'

export default function JsonView(src: Record<string, any>) {
  const computedColorScheme = useComputedColorScheme()

  return (
    <div className="overflow-hidden break-all">
      <ReactJsonView
        src={src}
        style={{ backgroundColor: 'transparent' }}
        theme={
          computedColorScheme === 'dark'
            ? 'summerfruit'
            : 'summerfruit:inverted'
        }
        enableClipboard={false}
        displayDataTypes={false}
        displayObjectSize={false}
      />
    </div>
  )
}
