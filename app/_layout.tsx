import React from 'react'
import { Stack } from 'expo-router'

export default function RootLayout(): React.JSX.Element {
  return <Stack screenOptions={{ headerShown: false }} />
}
