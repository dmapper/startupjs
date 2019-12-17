import React from 'react'
import { observer } from 'startupjs'
import { TouchableOpacity, Text, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import './index.styl'

export default observer(function MenuItem ({
  title,
  icon = {},
  customIcon = null,
  value,
  nested,
  isParentIcon,
  activeItem,
  activeItemBackground,
  style,
  className,
  children,
  onRequestActiveList,
  onChange
}) {
  onRequestActiveList && onRequestActiveList(value)

  const isActive = activeItem === value
  let paddingIcon = isParentIcon ? 16 * (nested - 1) : 0
  paddingIcon += (icon.name || customIcon) && !isParentIcon ? 16 : 0

  return pug`
    TouchableOpacity.root(
      styleName=isActive ? 'active' : ''
      style={
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16 * nested + paddingIcon,
        backgroundColor: isActive ? activeItemBackground : null
      }
      onPress=()=> onChange(value)
    )
      if !icon && customIcon
        View.icon=customIcon
      if icon.name && !customIcon
        View.icon
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
