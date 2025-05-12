import { useComputedColorScheme } from '@mantine/core'
import Compressor from '@uppy/compressor'
import Uppy from '@uppy/core'
import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import en from '@uppy/locales/lib/en_US'
import zh from '@uppy/locales/lib/zh_CN'
import { Dashboard } from '@uppy/react'
import XHR from '@uppy/xhr-upload'
import { useState } from 'react'

const languages = {
  en: en,
  zh: zh,
}

const createUppy = () => {
  const uppy = new Uppy({
    locale: languages.zh,
  })
  uppy.use(XHR, {
    endpoint: '/api/admin/media',
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    },
    responseType: 'json',
    shouldRetry: (xhr: XMLHttpRequest) => xhr.status !== 303,
    getResponseData: (xhr: XMLHttpRequest) => xhr.response.data,
    onAfterResponse: (xhr: XMLHttpRequest) => {
      if (xhr.status === 303) {
        throw new Error(`File already exists: ${xhr.response.data.filename}`)
      }
    },
  })

  uppy.use(Compressor)

  return uppy
}

export default function UppyDashboard({ doneButtonHandler }: { doneButtonHandler: () => void }) {
  const [uppy] = useState(createUppy)
  const computedColorScheme = useComputedColorScheme()

  const _doneButtonHandler = () => {
    uppy.clear()
    doneButtonHandler()
  }

  return (
    <Dashboard
      uppy={uppy}
      width="100%"
      height="20rem"
      proudlyDisplayPoweredByUppy={false}
      theme={computedColorScheme}
      doneButtonHandler={_doneButtonHandler}
    />
  )
}
