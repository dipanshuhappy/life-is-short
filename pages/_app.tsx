import '@/styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { HoldIC } from '@hold-ic/core'
import { HoldIcProvider, useHoldIc } from '@hold-ic/react'
import type { AppProps } from 'next/app'
import React from 'react'
import * as backend_backend from "../declarations/backend_backend/index"


const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })
export default function App({ Component, pageProps }: AppProps) {
  const { isConnected } = useHoldIc()
  console.log({ isConnected }, "is connected")

  return (<ChakraProvider theme={theme}>
    <HoldIcProvider holdIc={new HoldIC({
      whitelist: ["xyame-giaaa-aaaak-qcqja-cai"],
      host: "https://ic0.app",
      canisters: {
        backend_backend
      },
      dev: false
    })}><Component {...pageProps} /></HoldIcProvider>
  </ChakraProvider>
  )
}
