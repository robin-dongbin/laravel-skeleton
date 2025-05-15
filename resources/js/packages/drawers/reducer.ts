import { type DrawerSettings, type DrawerState, type OpenContextDrawer } from './context'

interface DrawersState {
  drawers: DrawerState[]

  /**
   * Drawer that is currently open or was the last open one.
   * Keeping the last one is necessary for providing a clean exit transition.
   */
  current: DrawerState | null
}

interface OpenAction {
  type: 'OPEN'
  drawer: DrawerState
}

interface CloseAction {
  type: 'CLOSE'
  drawerId: string
  canceled?: boolean
}

interface CloseAllAction {
  type: 'CLOSE_ALL'
  canceled?: boolean
}

interface UpdateAction {
  type: 'UPDATE'
  drawerId: string
  newProps: Partial<DrawerSettings>
}

function handleCloseDrawer(drawer: DrawerState) {
  drawer.props.onClose?.()
}

export function drawersReducer(
  state: DrawersState,
  action: OpenAction | CloseAction | CloseAllAction | UpdateAction,
): DrawersState {
  switch (action.type) {
    case 'OPEN': {
      return {
        current: action.drawer,
        drawers: [...state.drawers, action.drawer],
      }
    }
    case 'CLOSE': {
      const drawer = state.drawers.find((m) => m.id === action.drawerId)
      if (!drawer) {
        return state
      }

      handleCloseDrawer(drawer)

      const remainingDrawers = state.drawers.filter((m) => m.id !== action.drawerId)

      return {
        current: remainingDrawers[remainingDrawers.length - 1] || state.current,
        drawers: remainingDrawers,
      }
    }
    case 'CLOSE_ALL': {
      if (!state.drawers.length) {
        return state
      }

      // Resolve drawer stack from top to bottom
      state.drawers
        .concat()
        .reverse()
        .forEach((drawer) => {
          handleCloseDrawer(drawer)
        })

      return {
        current: state.current,
        drawers: [],
      }
    }
    case 'UPDATE': {
      const { drawerId, newProps } = action

      const updatedDrawers = state.drawers.map((drawer) => {
        if (drawer.id !== drawerId) {
          return drawer
        }

        if (drawer.type === 'content') {
          return {
            ...drawer,
            props: {
              ...drawer.props,
              ...newProps,
            },
          }
        }

        if (drawer.type === 'context') {
          return {
            ...drawer,
            props: {
              ...drawer.props,
              ...newProps,
              innerProps: {
                ...drawer.props.innerProps,
                ...(newProps as Partial<OpenContextDrawer<any>>).innerProps,
              },
            },
          }
        }

        return drawer
      })

      const currentDrawer =
        state.current?.id === drawerId
          ? updatedDrawers.find((drawer) => drawer.id === drawerId) || state.current
          : state.current

      return {
        ...state,
        drawers: updatedDrawers,
        current: currentDrawer,
      }
    }
    default: {
      return state
    }
  }
}
