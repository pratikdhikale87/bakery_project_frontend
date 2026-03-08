import { Navigate, useLocation } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

function ProtectedRoute({ children, role }) {
  const location = useLocation()
  const { currentUser } = useStore()
  const next = encodeURIComponent(`${location.pathname}${location.search}`)

  if (!currentUser) {
    return <Navigate to={`/account?next=${next}`} replace />
  }

  if (role && currentUser.role !== role) {
    return <Navigate to={`/account?next=${next}`} replace />
  }

  return children
}

export default ProtectedRoute
