import { Link } from 'react-router-dom'

export default function IndexPage() {
  return (
    <div>
      <h1>This is the landing page</h1>
      <div>
        <ul>
          <li>
            <Link to="/auth">Sign Up</Link>
          </li>
          <li>
            <Link to="/auth">Sign In</Link>
          </li>
          
          <li>
            <Link to="/app">Dashboard</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}