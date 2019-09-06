import React from "react"
import { silentAuth } from "../utils/auth"

export const SessionCheck: React.FC = ({ children }) => {
  const [loading, setLoading] = React.useState<boolean>(true)
  const handleCheckSession = () => {
    setLoading(false)
  }

  React.useEffect(() => {
    silentAuth(handleCheckSession)
  }, [])

  return loading ? null : <React.Fragment>{children}</React.Fragment>
}
