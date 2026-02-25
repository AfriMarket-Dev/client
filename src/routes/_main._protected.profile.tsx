import { createFileRoute } from '@tanstack/react-router'
import ProfilePage from '@/pages/profile-page'

export const Route = createFileRoute('/_main/_protected/profile')({
  component: ProfilePage,
})
