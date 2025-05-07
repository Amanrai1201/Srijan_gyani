import { HeroUIPluginConfig, HeroUIProvider } from '@heroui/react'
import React from 'react'
import Headers from './_components/Headers'

function Provider({children}:{children:React.ReactNode}){
  return (
    <HeroUIProvider>
      {/* <header></header> */}
      <Headers/>
        {children}
  </HeroUIProvider>
  )
}
export default Provider