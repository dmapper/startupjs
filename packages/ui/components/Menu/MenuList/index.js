import React, { useState, useEffect } from 'react'
import { observer } from 'startupjs'
import { Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { Collapse, Div, Icon } from '@startupjs/ui'
import { u } from '../../../config/helpers'
import './index.styl'

const SIZE_ICON = u(2)
const PADDING_ICON = u(1)

const MenuList = observer(({
  title,
  icon,
  customIcon,
  style,
  className,
  children,
  _isParentIcon,
  _nested,
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

  const nestedPadding = _nested > 1
    ? SIZE_ICON * (_nested + 1) + PADDING_ICON
    : SIZE_ICON

  return pug`
    Div.root
      TouchableOpacity.caption(
        onPress=()=>setIsOpen(!isOpen)
        style={
          paddingLeft: nestedPadding
        }
      )
        if !icon && customIcon
          Div.icon=customIcon
        if icon.name && !customIcon
          Div.icon
            Icon(
              ...icon
              size='s'
              color=hasActiveItem ? 'blue' : icon.color
            )
        Text=title
        Div.arrow(style=isOpen ? { transform: [{ rotate: '180deg'}] } : null)
          Icon(type='fa' size='s' name='caret-down')
      Collapse(isShow=isOpen)
        =children
  `
})

MenuList.defaultProps = {
  icon: {},
  _nested: 1
}

MenuList.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.object,
  customIcon: PropTypes.element
}

export default MenuList
