import React from 'react'
import { observer } from 'startupjs'
import { TouchableOpacity, Text } from 'react-native'
import { Div } from '@startupjs/ui'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import PropTypes from 'prop-types'
import './index.styl'

const MenuItem = observer(({
  title,
  icon = {},
  customIcon = null,
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

  const isActive = _activeItem === value
  let paddingIcon = _isParentIcon ? 16 * (_nested - 1) : 0
  paddingIcon += (icon.name || customIcon) && !_isParentIcon ? 16 : 0

  return pug`
    TouchableOpacity.root(
      styleName=isActive ? 'active' : ''
      style={
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16 * _nested + paddingIcon,
        backgroundColor: isActive ? _activeItemBackground : null
      }
      onPress=()=>_onChange(value)
    )
      if !icon && customIcon
        Div.icon=customIcon
      if icon.name && !customIcon
        Div.icon
          FontAwesomeIcon(
              ...icon
              icon=icon.type ? [icon.type, icon.name] : icon.name
              color=isActive ? 'blue' : icon.color
          )
      if children
        =children
      else
        Text=title
  `
})

MenuItem.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.object,
  customIcon: PropTypes.element
}

export default MenuItem
