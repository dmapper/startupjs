import React from 'react'
import { observer } from 'startupjs'
import { View } from 'react-native'

export default observer(function Menu ({
  activeItem,
  activeItemBackground,
  listArrowIcon,
  style,
  className,
  children,
  onChange
}) {
  children = React.Children.toArray(children)
  children = children.map(item => {
    return React.cloneElement(item, {
      activeItemBackground,
      listArrowIcon,
      activeItem,
      onChange
    })
  })

  return pug`
    View(
      style=style
      className=className
    )=children
  `
})
