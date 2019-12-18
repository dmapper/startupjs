import React, { useState, useEffect } from 'react'
import { observer } from 'startupjs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'
import { Collapse, Div } from '@startupjs/ui'
import './index.styl'

const MenuList = observer(({
  title,
  icon = {},
  customIcon,
  style,
  className,
  children,
  _isParentIcon,
  _nested = 1,
  _listArrowIcon,
  _onRequestActiveList,
  _activeItem,
  _activeItemBackground,
  _onChange
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasActiveItem, setHasActiveItem] = useState(false)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [isResetWhenChange, setIsResetWhenChange] = useState(false)
  _onRequestActiveList && _onRequestActiveList(hasActiveItem)

  useEffect(() => {
    if (isResetWhenChange) {
      setHasActiveItem(false)
      setIsResetWhenChange(false)
    }
  }, [_activeItem])
  const requestActiveChild = childValue => {
    if (childValue === true || _activeItem === childValue) {
      setHasActiveItem(true)
      setIsResetWhenChange(true)
      if (isFirstRender) {
        setIsOpen(true)
        setIsFirstRender(false)
      }
    }
  }

  children = React.Children.toArray(children).map(item => {
    return React.cloneElement(item, {
      _isParentIcon: !!icon.name || _isParentIcon,
      _nested: _nested + 1,
      _activeItemBackground,
      _activeItem,
      _onRequestActiveList: requestActiveChild,
      _onChange
    })
  })

  const paddingIcon = _isParentIcon ? 16 * (_nested - 1) : 0
  return pug`
    Div.root
      TouchableOpacity.caption(
        onPress=()=>setIsOpen(!isOpen)
        style={
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16 * _nested + paddingIcon
        }
      )
        if !icon && customIcon
          Div.icon=customIcon
        if icon.name && !customIcon
          Div.icon
            FontAwesomeIcon(
              ...icon
              icon=icon.type ? [icon.type, icon.name] : icon.name
              color=hasActiveItem ? 'blue' : icon.color
            )
        Text=title
        Div.arrow(style=isOpen ? { transform: [{ rotate: '180deg'}] } : null)
          FontAwesomeIcon(icon=['fa', 'caret-down'])
      Collapse(isShow=isOpen)
        =children
  `
})

MenuList.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.object,
  customIcon: PropTypes.element
}

export default MenuList
