import React, { useReducer } from 'react'
import { ScreenContext } from './screenContext'
import { screenReducer } from './screenReducer'
import { CHANGE_SCREEN } from '../types'


const ScreenState = ({ children }: any) => {
  const [state, dispatch] = useReducer(screenReducer, null)

  const changeScreen = (id: string | null) => dispatch({ type: CHANGE_SCREEN, payload: id })

  return (
    <ScreenContext.Provider value={{
      changeScreen,
      todoId: state
    }}>
      {children}
    </ScreenContext.Provider>
  )
}

export default ScreenState