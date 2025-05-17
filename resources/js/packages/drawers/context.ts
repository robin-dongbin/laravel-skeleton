import type { DrawerProps } from '@mantine/core'
import { createContext, type ReactNode } from 'react'

export type DrawerSettings = Partial<Omit<DrawerProps, 'opened'>> & { drawerId?: string }

export type ConfirmLabels = Record<'confirm' | 'cancel', ReactNode>

export interface OpenContextDrawer<CustomProps extends Record<string, any>> extends DrawerSettings {
  innerProps: CustomProps
}

export interface ContextDrawerProps<T extends Record<string, any>> {
  context: DrawersContextProps
  innerProps: T
  id: string
}

export type DrawerState =
  | { id: string; props: DrawerSettings; type: 'content' }
  | { id: string; props: OpenContextDrawer<any>; type: 'context'; ctx: string }

export interface DrawersContextProps {
  DrawerProps: DrawerSettings
  drawers: DrawerState[]
  openDrawer: (props: DrawerSettings) => string
  openContextDrawer: <TKey extends MantineDrawer>(
    drawer: TKey,
    props: OpenContextDrawer<Parameters<MantineDrawers[TKey]>[0]['innerProps']>,
  ) => string
  closeDrawer: (id: string, canceled?: boolean) => void
  closeContextDrawer: <TKey extends MantineDrawer>(id: TKey, canceled?: boolean) => void
  closeAll: () => void
  updateDrawer: (payload: { drawerId: string }) => void
  updateContextDrawer: (payload: { drawerId: string } & Partial<OpenContextDrawer<any>>) => void
}

// eslint-disable-next-line
export interface MantineDrawersOverride {}

export type MantineDrawersOverwritten = MantineDrawersOverride extends {
  drawers: Record<string, React.FC<ContextDrawerProps<any>>>
}
  ? MantineDrawersOverride
  : {
      drawers: Record<string, React.FC<ContextDrawerProps<any>>>
    }

export type MantineDrawers = MantineDrawersOverwritten['drawers']

export type MantineDrawer = keyof MantineDrawers

export const DrawersContext = createContext<DrawersContextProps>(null as any)
DrawersContext.displayName = '@mantine/drawers/DrawersContext'
