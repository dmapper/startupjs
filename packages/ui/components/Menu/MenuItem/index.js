import React from 'react'
import { observer } from 'startupjs'
import { TouchableOpacity, Text } from 'react-native'
import { Div, Icon } from '@startupjs/ui'
import PropTypes from 'prop-types'
import { u } from '../../../config/helpers'
import './index.styl'

const SIZE_ICON = u(2)
const PADDING_ICON = u(1)

const MenuItem = observer(({
  title,
  icon,
  customIcon,
  value,
  style,
  className,
  children,
  _nested,
  _activeItem,
  _isParentIcon,
  _activeItemBackground,
  _onRequestActiveList,
  _onChange
}) => {
  _onRequestActiveList && _onRequestActiveList(value)

  let nestedPadding = SIZE_ICON * _nested
  nestedPadding += _isParentIcon && _nested > 0 ? SIZE_ICON : 0

  const isActive = _activeItem === value
  return pug`
    TouchableOpacity.root(
      styleName=isActive ? 'active' : ''
      style={
        paddingLeft: nestedPadding + PADDING_ICON,
        backgroundColor: isActive ? _activeItemBackground : null
      }
      onPress=()=>_onChange(value)
    )
      if !icon && customIcon
        Div.icon=customIcon
      if icon.name && !customIcon
        Div.icon
          Icon(
            ...icon
            size='s'
            color=isActive ? 'blue' : icon.color
          )
      if children
        =children
      else
        Text=title
  `
})

MenuItem.defaultProps = {
  icon: {},
  customIcon: null
}

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
  icon: PropTypes.object,
  customIcon: PropTypes.element
}

export default MenuItem
