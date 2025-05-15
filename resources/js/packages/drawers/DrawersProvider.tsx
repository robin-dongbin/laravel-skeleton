import { Drawer, getDefaultZIndex } from '@mantine/core'
import { randomId } from '@mantine/hooks'
import { useCallback, useReducer, useRef } from 'react'
import {
  DrawersContext,
  type ContextDrawerProps,
  type DrawersContextProps,
  type DrawerSettings,
  type OpenContextDrawer,
} from './context'
import { useDrawersEvents } from './events'
import { drawersReducer } from './reducer'

export interface DrawersProviderProps {
  /** Your app */
  children?: React.ReactNode

  /** Predefined drawers */
  drawers?: Record<string, React.FC<ContextDrawerProps<any>>>

  /** Shared Drawer component props, applied for every drawer */
  drawerProps?: DrawerSettings
}

export function DrawersProvider({ children, drawerProps, drawers }: DrawersProviderProps) {
  const [state, dispatch] = useReducer(drawersReducer, { drawers: [], current: null })
  const stateRef = useRef(state)
  stateRef.current = state

  const closeAll = useCallback(
    (canceled?: boolean) => {
      dispatch({ type: 'CLOSE_ALL', canceled })
    },
    [dispatch],
  )

  const openDrawer = useCallback(
    ({ drawerId, ...props }: DrawerSettings) => {
      const id = drawerId || randomId()

      dispatch({
        type: 'OPEN',
        drawer: {
          id,
          type: 'content',
          props,
        },
      })
      return id
    },
    [dispatch],
  )

  const openContextDrawer = useCallback(
    (drawer: string, { drawerId, ...props }: OpenContextDrawer<any>) => {
      const id = drawerId || randomId()
      dispatch({
        type: 'OPEN',
        drawer: {
          id,
          type: 'context',
          props,
          ctx: drawer,
        },
      })
      return id
    },
    [dispatch],
  )

  const closeDrawer = useCallback(
    (id: string, canceled?: boolean) => {
      dispatch({ type: 'CLOSE', drawerId: id, canceled })
    },
    [dispatch],
  )

  const updateDrawer = useCallback(
    ({ drawerId, ...newProps }: Partial<DrawerSettings> & { drawerId: string }) => {
      dispatch({
        type: 'UPDATE',
        drawerId,
        newProps,
      })
    },
    [dispatch],
  )

  const updateContextDrawer = useCallback(
    ({ drawerId, ...newProps }: { drawerId: string } & Partial<OpenContextDrawer<any>>) => {
      dispatch({ type: 'UPDATE', drawerId, newProps })
    },
    [dispatch],
  )

  useDrawersEvents({
    openDrawer,
    openContextDrawer: ({ drawer, ...payload }: any) => openContextDrawer(drawer, payload),
    closeDrawer,
    closeContextDrawer: closeDrawer,
    closeAllDrawers: closeAll,
    updateDrawer,
    updateContextDrawer,
  })

  const ctx: DrawersContextProps = {
    drawerProps: drawerProps || {},
    drawers: state.drawers,
    openDrawer,
    openContextDrawer,
    closeDrawer,
    closeContextDrawer: closeDrawer,
    closeAll,
    updateDrawer,
    updateContextDrawer,
  }

  const getCurrentDrawer = () => {
    const currentDrawer = stateRef.current.current
    switch (currentDrawer?.type) {
      case 'context': {
        const { innerProps, ...rest } = currentDrawer.props
        const ContextDrawer = drawers![currentDrawer.ctx]!

        return {
          drawerProps: rest,
          content: <ContextDrawer innerProps={innerProps} context={ctx} id={currentDrawer.id} />,
        }
      }
      case 'content': {
        const { children: currentDrawerChildren, ...rest } = currentDrawer.props

        return {
          drawerProps: rest,
          content: currentDrawerChildren,
        }
      }
      default: {
        return {
          drawerProps: {},
          content: null,
        }
      }
    }
  }

  const { drawerProps: currentDrawerProps, content } = getCurrentDrawer()

  return (
    <DrawersContext.Provider value={ctx}>
      <Drawer
        zIndex={getDefaultZIndex('modal') + 1}
        {...drawerProps}
        {...currentDrawerProps}
        opened={state.drawers.length > 0}
        onClose={() => closeDrawer(state.current?.id as any)}
      >
        {content}
      </Drawer>

      {children}
    </DrawersContext.Provider>
  )
}
