import { Routes, Route } from 'react-router-dom'
import { AuthLayout, LoginForm, RegisterForm, AuthFooter, ProtectedRoute } from './components/auth'
import { DashboardLayout, DashboardHeader, StatsGrid, ProfileCard } from './components/dashboard'

function App() {
  return (
    <Routes>
      <Route path="/login" element={
        <AuthLayout title="Welcome back" subtitle="Enter your email below to login to your account">
          <LoginForm />
          <AuthFooter text="Don't have an account?" linkText="Sign up" to="/register" />
        </AuthLayout>
      } />
      <Route path="/register" element={
        <AuthLayout title="Create an account" subtitle="Enter your details below to create your account">
          <RegisterForm />
          <AuthFooter text="Already have an account?" linkText="Sign in" to="/login" />
        </AuthLayout>
      } />

      <Route path="/" element={
        <ProtectedRoute>
          <DashboardLayout>
            <DashboardHeader title="Dashboard" />
            <StatsGrid />
            <ProfileCard title="Account Details" />
          </DashboardLayout>
        </ProtectedRoute>
      } />

    </Routes>
  )
}

export default App