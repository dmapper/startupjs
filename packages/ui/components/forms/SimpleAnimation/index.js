import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef
} from 'react'
import { View, Animated } from 'react-native'
import { observer } from 'startupjs'
import './index.styl'

const SCALE_TIMING = 280
const FADE_TIMING = 80
// 0.01 because on android animations does not work with value 0
const MIN_SCALE_RATIO = 0.01
const MAX_SCALE_RATIO = 1
const DEFAULT_BG_OPACITY = 0.25

function Animation (props, ref) {
  const animationRef = useRef()
  const [scaleAnimation] = useState(new Animated.Value(MIN_SCALE_RATIO))
  const [opacityAnimation] = useState(new Animated.Value(DEFAULT_BG_OPACITY))
  useImperativeHandle(ref, () => ({
    animate: () => {
      Animated.timing(
        scaleAnimation,
        {
          toValue: MAX_SCALE_RATIO,
          duration: SCALE_TIMING
        }
      ).start(() => {
        Animated.timing(
          opacityAnimation,
          {
            toValue: 0,
            duration: FADE_TIMING
          }
        ).start(() => {
          scaleAnimation.setValue(MIN_SCALE_RATIO)
          opacityAnimation.setValue(DEFAULT_BG_OPACITY)
        })
      })
    }
  }))

  return pug`
    View.root(
      activeOpacity=1
      ref=animationRef
      ...props
    )
      Animated.View.background(
        style={
          backgroundColor: props.color,
          opacity: opacityAnimation,
          transform: [{
            scale: scaleAnimation
          }]
        }
      )
      View.content
        = props.children
  `
}
const SimpleAnimation = forwardRef(Animation)
export default observer(({ ...props }) => {
  const ref = useRef()
  console.log(this)
  return pug`
    SimpleAnimation(...props ref=ref)
  `
})
