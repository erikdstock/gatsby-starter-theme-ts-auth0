import React from "react"
import { silentAuth, User, HandleUser } from "../../utils/auth"
import { UserContext } from "./AuthenticationProvider"
import { isBrowser } from "../../utils/environment"

export const SessionCheck: React.FC<{ authContext: UserContext }> = ({
  authContext,
  children,
}) => {
  const [loading, setLoading] = React.useState<boolean>(true)

  const handleCheckSession: HandleUser = (user: User) => {
    authContext.setUser(user)
    setLoading(false)
  }

  // useLayoutEffect?
  React.useEffect(() => {
    if (isBrowser) {
      silentAuth(handleCheckSession)
    }
  }, [])

  return loading ? (
    <pre>loading...</pre>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  )
}
