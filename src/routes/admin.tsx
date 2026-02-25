import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { store } from '@/app/store'
import { AdminLayout } from '@/components/layout/admin-layout'

const ALLOWED_ROLES = ['admin', 'agent']

export const Route = createFileRoute('/admin')({
  beforeLoad: () => {
    const { isAuthenticated, user } = store.getState().auth
    if (!isAuthenticated) {
      throw redirect({
        to: '/auth/signin',
      })
    }
    if (!user?.role || !ALLOWED_ROLES.includes(user.role)) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: AdminLayout,
})
