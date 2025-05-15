import { createUseExternalEvents } from '@mantine/core'
import { randomId } from '@mantine/hooks'
import { type DrawerSettings, type MantineDrawer, type MantineDrawers, type OpenContextDrawer } from './context'

type DrawersEvents = {
  openDrawer: (payload: DrawerSettings) => string
  openContextDrawer: <TKey extends MantineDrawer>(
    payload: OpenContextDrawer<Parameters<MantineDrawers[TKey]>[0]['innerProps']> & { drawer: TKey },
  ) => string
  closeDrawer: (id: string) => void
  closeContextDrawer: <TKey extends MantineDrawer>(id: TKey) => void
  closeAllDrawers: () => void
  updateDrawer: (payload: { drawerId: string } & Partial<DrawerSettings>) => void
  updateContextDrawer: (payload: { drawerId: string } & Partial<OpenContextDrawer<any>>) => void
}

export const [useDrawersEvents, createEvent] = createUseExternalEvents<DrawersEvents>('mantine-drawers')

export const openDrawer: DrawersEvents['openDrawer'] = (payload) => {
  const id = payload.drawerId || randomId()
  createEvent('openDrawer')({ ...payload, drawerId: id })
  return id
}

export const openContextDrawer: DrawersEvents['openContextDrawer'] = <TKey extends MantineDrawer>(
  payload: OpenContextDrawer<Parameters<MantineDrawers[TKey]>[0]['innerProps']> & { drawer: TKey },
) => {
  const id = payload.drawerId || randomId()
  createEvent('openContextDrawer')({ ...payload, drawerId: id })
  return id
}

export const closeDrawer = createEvent('closeDrawer')

export const closeContextDrawer: DrawersEvents['closeContextDrawer'] = <TKey extends MantineDrawer>(id: TKey) =>
  createEvent('closeContextDrawer')(id)

export const closeAllDrawers = createEvent('closeAllDrawers')

export const updateDrawer = (payload: { drawerId: string } & Partial<DrawerSettings>) =>
  createEvent('updateDrawer')(payload)

export const updateContextDrawer = (payload: { drawerId: string } & Partial<OpenContextDrawer<any>>) =>
  createEvent('updateContextDrawer')(payload)

export const drawers: {
  open: DrawersEvents['openDrawer']
  close: DrawersEvents['closeDrawer']
  closeAll: DrawersEvents['closeAllDrawers']
  openContextDrawer: DrawersEvents['openContextDrawer']
  updateDrawer: DrawersEvents['updateDrawer']
  updateContextDrawer: DrawersEvents['updateContextDrawer']
} = {
  open: openDrawer,
  close: closeDrawer,
  closeAll: closeAllDrawers,
  openContextDrawer,
  updateDrawer,
  updateContextDrawer,
}
