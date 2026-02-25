import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { store } from '@/app/store'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

const PROVIDER_ROLES = ['provider', 'admin', 'agent']

export const Route = createFileRoute('/dashboard')({
  beforeLoad: () => {
    const { isAuthenticated, user } = store.getState().auth
    if (!isAuthenticated) {
      throw redirect({
        to: '/auth/signin',
      })
    }
    if (!user?.role || !PROVIDER_ROLES.includes(user.role)) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: DashboardLayout,
})
