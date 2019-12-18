import React from 'react'
import { observer } from 'startupjs'
import { Text, TouchableOpacity } from 'react-native'
import { Div } from '@startupjs/ui'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import PropTypes from 'prop-types'
import './index.styl'

const SIZES = {
  s: 16,
  m: 24,
  l: 32
}

/* TODO: color icon need fix */
const Chips = observer(function ({
  title,
  color = 'primary',
  size = 'm',
  iconLeft = {},
  iconRight = {},
  statusColor,
  isError = false,
  isDisabled = false,
  isOutline = false,
  className,
  style,
  onChange
}) {
  const partSize = (SIZES[size] || size) / 2
  const _style = {
    ...style,
    height: SIZES[size] || size,
    borderRadius: (iconLeft.name || iconRight.name) ? 8 : 32
  }

  const Wrapper = onChange && !isDisabled ? TouchableOpacity : Div
  return pug`
    Div.root
      Wrapper.item(
        styleName=[
          color,
          statusColor,
          isOutline && 'outline',
          isError && 'error',
          isDisabled && 'disabled'
        ]
        className=className
        onPress=onChange
        style=_style
      )
        if iconLeft.name
          FontAwesomeIcon(
            color=isOutline ? 'black' : 'white'
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
            paddingLeft: partSize + 2,
            paddingRight: partSize + 2
          }
        )=title
        if iconRight.name
          FontAwesomeIcon(
            color=isOutline ? 'black' : 'white'
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
})

Chips.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(Object.keys(SIZES))]),
  iconLeft: PropTypes.object,
  iconRight: PropTypes.object,
  isError: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isOutline: PropTypes.bool,
  statusColor: PropTypes.oneOf(['success', 'warning', 'dark'])
}

export default Chips
