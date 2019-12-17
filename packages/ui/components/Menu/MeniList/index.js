import React, { useState, useEffect } from 'react'
import { observer } from 'startupjs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { View, TouchableOpacity, Text } from 'react-native'
import { Collapse } from '@startupjs/ui'
import './index.styl'

export default observer(function MenuList ({
  title,
  icon = {},
  isParentIcon,
  nested = 1,
  customIcon,
  activeItem,
  activeItemBackground,
  listArrowIcon,
  style,
  className,
  children,
  onRequestActiveList,
  onChange
}) {
  const [active, setActive] = useState(false)
  const [hasActiveItem, setHasActiveItem] = useState(false)
  const [firstRender, setFirstRender] = useState(true)
  const [update, setUpdate] = useState(false)
  onRequestActiveList && onRequestActiveList(hasActiveItem)

  useEffect(() => {
    if (update) {
      setHasActiveItem(false)
      setUpdate(false)
    }
  }, [activeItem])
  const _onRequestActiveList = val => {
    if (val === true || activeItem === val) {
      setHasActiveItem(true)
      setUpdate(true)
      if (firstRender) {
        setActive(true)
        setFirstRender(false)
      }
    }
  }

  children = React.Children.toArray(children).map(item => {
    return React.cloneElement(item, {
      isParentIcon: !!icon.name || isParentIcon,
      nested: nested + 1,
      activeItemBackground,
      activeItem,
      onRequestActiveList: _onRequestActiveList,
      onChange
    })
  })

  const paddingIcon = isParentIcon ? 16 * (nested - 1) : 0
  return pug`
    View.root
      TouchableOpacity.caption(
        onPress=()=>setActive(!active)
        style={
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16 * nested + paddingIcon
        }
      )
        if !icon && customIcon
          View.icon=customIcon
        if icon.name && !customIcon
          View.icon
            FontAwesomeIcon(
              ...icon
              icon=icon.type ? [icon.type, icon.name] : icon.name
              color=hasActiveItem ? 'blue' : icon.color
            )
        Text=title
        View.arrow(style=active ? { transform: [{ rotate: '180deg'}] } : null)
          FontAwesomeIcon(icon=['fa', 'caret-down'])
      Collapse(isShow=active)
        =children
  `
})
