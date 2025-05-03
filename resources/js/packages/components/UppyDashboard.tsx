import Compressor from '@uppy/compressor'
import Uppy from '@uppy/core'
import en from '@uppy/locales/lib/en_US'
import zh from '@uppy/locales/lib/zh_CN'
import { Dashboard } from '@uppy/react'
import XHR from '@uppy/xhr-upload'
import { useState } from 'react'

import admin from '@/routes/admin'
import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'

const languages = {
  en: en,
  zh: zh,
}

function createUppy() {
  const uppy = new Uppy({
    locale: languages.zh,
  })
  uppy.use(XHR, {
    endpoint: admin.media.store.url(),
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    },
  })
  uppy.use(Compressor)
  return uppy
}

export default function UppyDashboard() {
  const [uppy] = useState(createUppy)

  return <Dashboard uppy={uppy} width="100%" height="20rem" proudlyDisplayPoweredByUppy={false} />
}
