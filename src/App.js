import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import store from 'utils/store'
import { NativeBaseProvider } from 'native-base'
import 'utils/ignore'

// assets
import { imageAssets } from 'theme/images'
import { fontAssets } from 'theme/fonts'
import Router from './routes'

const App = () => {
  // state
  const [didLoad, setDidLoad] = useState(false)

  // handler
  const handleLoadAssets = async () => {
    // assets preloading
    await Promise.all([...imageAssets, ...fontAssets])
    setDidLoad(true)
  }

  // lifecycle
  useEffect(() => {
    handleLoadAssets()
  }, [])

  const config = {
    dependencies: {
      'linear-gradient': require('expo-linear-gradient').LinearGradient,
    },
  }
  // rendering
  if (!didLoad)
    return (
      <NativeBaseProvider config={config}>
        <View />
      </NativeBaseProvider>
    )
  return (
    <NativeBaseProvider config={config}>
      <Provider store={store}>
        <Router />
      </Provider>
    </NativeBaseProvider>
  )
}

export default App
