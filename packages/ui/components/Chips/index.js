import React from 'react'
import { observer } from 'startupjs'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import './index.styl'

const SIZES = {
  s: 16,
  m: 24,
  l: 32
}

const Chips = observer(function ({
  title,
  variant = 'default',
  color = 'primary',
  size = 'm',
  iconLeft = {},
  iconRight = {},
  isError,
  isSuccess,
  isWarning,
  isDisabled,
  className,
  style,
  onPress
}) {
  const partSize = (SIZES[size] || size) / 2
  const _style = {
    ...style,
    height: SIZES[size] || size,
    paddingLeft: partSize,
    paddingRight: partSize
  }

  const Wrapper = onPress ? TouchableOpacity : View
  return pug`
    View.root
      Wrapper.item(
        styleName=color
        className=className
        onPress=onPress
        style=_style
      )
        if iconLeft.name
          Text iconLeft
        Text.text(
          style={fontSize: partSize }
        )=title
        if iconRight.name
          Text iconRight
  `
})

Chips.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(Object.keys(SIZES))
  ]),
  iconLeft: PropTypes.object,
  iconRight: PropTypes.object,
  isError: PropTypes.bool,
  isSuccess: PropTypes.bool,
  isWarning: PropTypes.bool,
  isDisabled: PropTypes.bool
}

export default Chips
