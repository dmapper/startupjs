import React from 'react'
import { observer } from 'startupjs'
import propTypes from 'prop-types'
import Span from '../Span'
import Div from '../Div'
import Popover from './Popover'

import {
  Menu,
  MenuOptions,
  MenuTrigger,
  // renderers,
  withMenuContext
} from 'react-native-popup-menu'

import './index.styl'
export { MenuProvider } from 'react-native-popup-menu'

function Dropdown ({
  anchor,
  trigger = pug`
    Div
      Span Open!
  `,
  options = [{ label: 'foo' }, { label: 'bar' }, { label: 'baz' }],
  placement,
  children,
  optionsContainerStyle,
  closeOnItemClick,
  ctx,
  triggerProps,
  ...props
}) {
  function onMenuClick (cb) {
    if (closeOnItemClick) {
      ctx && ctx.menuActions.closeMenu()
    }
    cb && cb()
  }

  function getOptions () {
    return pug`
      each o, index in options
        Div(key=index onPress=() => onMenuClick(o.fn))
          Span(numberOfLines=1)= o.label || ''
    `
  }

  function modifyChildren (children) {
    if (!ctx) return children
    return React.Children.toArray(children).map(child => {
      return React.cloneElement(child, {
        closeMenu: ctx.menuActions.closeMenu
      })
    })
  }

  return pug`
    Menu(
      renderer=Popover
      rendererProps={
      }
    )
      if trigger
        MenuTrigger= trigger
      MenuOptions
        Div
          = getOptions()
          = modifyChildren(children)
  `
}

Dropdown.defaultProps = {
  anchor: true,
  placement: 'left',
  closeOnItemClick: true
}

Dropdown.propTypes = {
  anchor: propTypes.bool,
  placement: propTypes.oneOf(['top', 'right', 'bottom', 'left']),
  closeOnItemClick: propTypes.bool
}

export default withMenuContext(observer(Dropdown))
