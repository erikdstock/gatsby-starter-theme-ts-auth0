import React from "react"
import { Router, RouteComponentProps } from "@reach/router"
import { Link } from "gatsby"
import { isAuthenticated, getProfile, login, logout, User } from "../utils/auth";

interface UserProps {
    user: User
}

type AuthenticatedRouteComponent = React.ComponentType<RouteComponentProps & UserProps>
const Home: AuthenticatedRouteComponent = ({ user }) => {
  return <p>Hi, {user.name ? user.name : "friend"}!</p>
}
const Settings: AuthenticatedRouteComponent = () => <p>Settings</p>
const Billing: AuthenticatedRouteComponent = () => <p>Billing</p>

const Account = () => {
    if (!isAuthenticated()) {
        login()
        return <p>Redirecting to login...</p>
      }
    
      const user = getProfile()
    
    return(
  <>
    <nav>
      <Link to="/account">Home</Link>{" "}
      <Link to="/account/settings">Settings</Link>{" "}
      <Link to="/account/billing">Billing</Link>{" "}
      <a
        href="#logout"
        onClick={e => {
          logout()
          e.preventDefault()
        }}
      >
        Log Out
      </a>
    </nav>
    <Router>
      <Home path="/account" user={user} />
      <Settings path="/account/settings" />
      <Billing path="/account/billing" />
    </Router>
  </>
)
    }
export default Account

// import React from "react"
// import { Router } from "@reach/router"
// import { login, logout, isAuthenticated, getProfile } from "../utils/auth"
// import { Link } from "gatsby"

// const Home = ({ user }) => {
//   return <p>Hi, {user.name ? user.name : "friend"}!</p>
// }
// const Settings = () => <p>Settings</p>
// const Billing = () => <p>Billing</p>

// const Account = () => {
 
//   return (
//     <>
//       <nav>
//         <Link to="/account/">Home</Link>{" "}
//         <Link to="/account/settings/">Settings</Link>{" "}
//         <Link to="/account/billing/">Billing</Link>{" "}
//         <a
//           href="#logout"
//           onClick={e => {
//             logout()
//             e.preventDefault()
//           }}
//         >
//           Log Out
//         </a>
//       </nav>
//       <Router>
//         <Home path="/account/" user={user} />
//         <Settings path="/account/settings" />
//         <Billing path="/account/billing" />
//       </Router>
//     </>
//   )
// }

// export default Account
