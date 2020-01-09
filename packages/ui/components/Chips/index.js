import React from 'react'
import { observer } from 'startupjs'
import { Text } from 'react-native'
import { Div, Icon } from '@startupjs/ui'
import { ui } from 'config'
import PropTypes from 'prop-types'
import './index.styl'

const SIZES = {
  xs: 8,
  s: 16,
  m: 24,
  l: 32
}

const Chips = observer(function ({
  title,
  color,
  size,
  iconLeft,
  iconRight,
  statusColor,
  verticalPosition,
  horizontalPosition,
  isBadge,
  isAttention,
  isDisabled,
  isOutline,
  className,
  style,
  children,
  onChange
}) {
  if (!title) return null

  const partSize = (SIZES[size] || size) / 2
  const _style = {
    ...style,
    height: SIZES[size] || size,
    borderRadius: (iconLeft.name || iconRight.name) && !isBadge ? partSize / 2 : 32,
    position: isBadge ? 'absolute' : 'relative',
    [verticalPosition]: isBadge ? '-50%' : null,
    [horizontalPosition]: isBadge ? '-50%' : null
  }

  const getColors = () => {
    if (isDisabled) return 'disabled'
    if (isAttention) return 'attention'
    if (statusColor) return statusColor
    return color
  }

  const Component = () => {
    return pug`
      Div.item(
        styleName=[getColors(), isOutline && 'outline', isBadge && 'badge']
        isDisabled=isDisabled
        className=className
        onPress=onChange
        style=_style
      )
        if iconLeft.name && !isBadge
          Icon(
            color=isOutline ? ui.colors[getColors()] || color : ui.colors.white
            ...iconLeft
            icon=iconLeft.type ? [iconLeft.type, iconLeft.name] : iconLeft.name
            width=partSize
            height=partSize
            style={
              marginLeft: partSize - 4,
              marginRight: (-partSize / 2) - 2
            }
          )
        Text.text(
          style={
            fontSize: partSize,
            paddingLeft: partSize - (isBadge ? 3 : -2),
            paddingRight: partSize - (isBadge ? 3 : -2)
          }
        )=title
        if iconRight.name && !isBadge
          Icon(
            color=isOutline ? ui.colors[getColors()] || color : ui.colors.white
            ...iconRight
            icon=iconRight.type ? [iconRight.type, iconRight.name] : iconRight.name
            width=partSize
            height=partSize
            style={
              marginLeft: (-partSize / 2) - 2,
              marginRight: partSize - 4
            }
          )
    `
  }

  return pug`
    if isBadge
      =children
      Div.badgeCase(
        style={
          [verticalPosition]: 0,
          [horizontalPosition]: 0,
          height: SIZES[size],
          width: SIZES[size]
        }
      )
        Component
    else
      Component
  `
})

Chips.defaultProps = {
  color: 'primary',
  size: 'm',
  iconLeft: {},
  iconRight: {},
  verticalPosition: 'top',
  horizontalPosition: 'right',
  isBadge: false,
  isAttention: false,
  isDisabled: false,
  isOutline: false
}

Chips.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(Object.keys(SIZES))]),
  iconLeft: PropTypes.object,
  iconRight: PropTypes.object,
  verticalPosition: PropTypes.oneOf(['top', 'bottom']),
  horizontalPosition: PropTypes.oneOf(['right', 'left']),
  isBadge: PropTypes.bool,
  isAttention: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isOutline: PropTypes.bool,
  statusColor: PropTypes.oneOf(['success', 'warning', 'dark'])
}

export default Chips
