import React from 'react'
import { observer } from 'startupjs'
import PropTypes from 'prop-types'
import { Div } from '@startupjs/ui'

const Menu = observer(({
  activeItem,
  activeItemBackground,
  listArrowIcon,
  style,
  className,
  children,
  onChange
}) => {
  children = React.Children.toArray(children).map(item => {
    return React.cloneElement(item, {
      _activeItemBackground: activeItemBackground,
      _listArrowIcon: listArrowIcon,
      _activeItem: activeItem,
      _onChange: onChange
    })
  })

  return pug`
    Div(
      style=style
      className=className
    )=children
  `
})

Menu.propTypes = {
  activeItem: PropTypes.string,
  activeItemBackground: PropTypes.string,
  listArrowIcon: PropTypes.object,
  onChange: PropTypes.func
}

export default Menu
