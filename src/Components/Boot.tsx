import React from "react"
import { AuthenticationProvider } from "./Authentication"

export const Boot: React.FC = ({ children }) => {
  return <AuthenticationProvider>{children}</AuthenticationProvider>
}
