import React, { useState, useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'startupjs'
import { Animated, View, Platform } from 'react-native'

const MODE_KEYS = { vertical: 'height', horizontal: 'width' }
const getSumChildren = children => {
  let sum = 0
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      sum++
      if (children[i].props.children) {
        return sum + getSumChildren(children[i].props.children)
      }
    }
  } else {
    sum++
    if (children.props.children) {
      return sum + getSumChildren(children.props.children)
    }
  }
  return sum
}

const Collapse = observer(({
  isShow = false,
  isAnimate = true,
  maxValue,
  minValue = 0,
  mode = 'vertical',
  style = {},
  className,
  children
}) => {
  const timeoutOverflow = useRef()
  const timeoutFullValue = useRef()
  const curModeKey = MODE_KEYS[mode]
  const [overflow, setOverflow] = useState(true)
  const [fullValue, setFullValue] = useState(null)
  const [curValue, setCurValue] = useState(new Animated.Value(minValue))

  useEffect(() => {
    if (!fullValue) return
    if (isAnimate) {
      clearTimeout(timeoutOverflow.current)
      curValue.stopAnimation()

      if (!isShow) setOverflow(true)
      Animated.timing(curValue, {
        toValue: isShow ? fullValue : minValue,
        duration: 300
      }).start()
      timeoutOverflow.current = setTimeout(() => {
        isShow && setOverflow(false)
      }, 300)
      return
    }

    setOverflow(!isShow)
    setCurValue(isShow ? fullValue : minValue)
  }, [isShow])

  const onRender = e => {
    clearTimeout(timeoutFullValue.current)
    let val = e.nativeEvent.layout[curModeKey]

    if ((val !== fullValue && isShow) || fullValue === null) {
      if (!isShow && Platform.OS !== 'web' && fullValue === null) {
        val = e.nativeEvent.layout[curModeKey] / getSumChildren(children) * (children.length || 1)
      }
      if (fullValue !== null && val) {
        timeoutFullValue.current = setTimeout(() => curValue.setValue(val), 100)
      }
      if (isShow && fullValue === null) {
        setOverflow(false)
        curValue.setValue(val > maxValue ? maxValue : val)
      }
      setFullValue(val > maxValue ? maxValue : val)
    }
  }

  const getValue = () => {
    if (fullValue === null) return
    return curValue
  }

  const Wrapper = useMemo(() => isAnimate ? Animated.View : View, [isAnimate])
  const _style = {
    ...style,
    opacity: fullValue === null ? 0 : 1,
    position: 'relative',
    overflow: overflow || maxValue ? 'hidden' : 'visible',
    [curModeKey]: overflow || maxValue ? getValue() : null
  }

  return pug`
    Wrapper(
      onLayout=onRender
      className=className
      style=_style
    )
      =children
  `
})

Collapse.propTypes = {
  isShow: PropTypes.bool,
  isAnimate: PropTypes.bool,
  minValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mode: PropTypes.oneOf(['horizontal', 'vertical'])
}

export default Collapse
