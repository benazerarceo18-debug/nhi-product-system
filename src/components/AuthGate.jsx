import { useState, useEffect, createContext, useContext } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

const ALLOWED_EMAILS = [
  'benazerarceo18@gmail.com',
  'info@nipponhasha.com',
  'ryan@nipponhasha.com',
  'edwin@nipponhasha.com',
]

function isAllowed(email) {
  if (!email) return false
  if (email.endsWith('@nipponhasha.com')) return true
  return ALLOWED_EMAILS.includes(email.toLowerCase())
}

export default function AuthGate({ children }) {
  const [session, setSession] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const [isRecovery, setIsRecovery] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecovery(true)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-shironeri">
        <div className="text-center">
          <img src="/nhi-logo.png" alt="NHI" className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return <LoginPage />
  }

  if (isRecovery) {
    return <ResetPasswordPage onDone={() => setIsRecovery(false)} />
  }

  if (!isAllowed(session.user.email)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-shironeri">
        <div className="card max-w-md text-center">
          <img src="/nhi-logo.png" alt="NHI" className="w-20 h-20 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-sumi mb-2">Access Denied</h2>
          <p className="text-sm text-gray-500 mb-4">
            {session.user.email} is not authorized to access NHI Operations Hub.
            Contact your administrator.
          </p>
          <button onClick={() => supabase.auth.signOut()} className="btn-primary text-sm">Sign Out</button>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user: session.user, signOut: () => supabase.auth.signOut() }}>
      {children}
    </AuthContext.Provider>
  )
}

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('login')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      } else if (mode === 'signup') {
        if (!isAllowed(email)) {
          throw new Error('Only @nipponhasha.com emails or authorized users can register.')
        }
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMessage('Check your email for a confirmation link.')
      } else if (mode === 'magic') {
        if (!isAllowed(email)) {
          throw new Error('Only authorized NHI emails can access this system.')
        }
        const { error } = await supabase.auth.signInWithOtp({ email })
        if (error) throw error
        setMessage('Magic link sent! Check your email.')
      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + '/settings',
        })
        if (error) throw error
        setMessage('Password reset link sent! Check your email.')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center pattern-asanoha">
      <div className="absolute inset-0 bg-gradient-to-b from-navy/90 to-navy/95" />
      <div className="relative z-10 w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full kamon-ring bg-navy mx-auto mb-4 flex items-center justify-center overflow-hidden">
            <img src="/nhi-logo.png" alt="NHI" className="w-20 h-20 object-contain" />
          </div>
          <p className="text-gold/70 text-xs tracking-[0.3em] uppercase font-medium">Nippon Hasha Inc.</p>
          <h1 className="text-2xl font-bold text-gofun font-heading mt-1">Operations Hub</h1>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Email</label>
            <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@nipponhasha.com" required />
          </div>

          {mode !== 'magic' && mode !== 'forgot' && (
            <div>
              <label className="text-xs text-gray-500 block mb-1">Password</label>
              <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" required minLength={6} />
            </div>
          )}

          {error && <p className="text-xs text-red-600 bg-red-50 rounded px-3 py-2">{error}</p>}
          {message && <p className="text-xs text-green-600 bg-green-50 rounded px-3 py-2">{message}</p>}

          <button type="submit" className="btn-gold w-full" disabled={loading}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : mode === 'forgot' ? 'Send Reset Link' : 'Send Magic Link'}
          </button>

          <div className="flex flex-wrap justify-between gap-y-1 text-xs">
            {mode !== 'login' && (
              <button type="button" onClick={() => { setMode('login'); setError(''); setMessage('') }} className="text-gray-400 hover:text-gold">
                Sign in with password
              </button>
            )}
            {mode === 'login' && (
              <button type="button" onClick={() => { setMode('forgot'); setError(''); setMessage('') }} className="text-gray-400 hover:text-gold">
                Forgot password?
              </button>
            )}
            {mode !== 'magic' && mode !== 'forgot' && (
              <button type="button" onClick={() => { setMode('magic'); setError(''); setMessage('') }} className="text-gray-400 hover:text-gold">
                Use magic link
              </button>
            )}
            {mode !== 'signup' && mode !== 'forgot' && (
              <button type="button" onClick={() => { setMode('signup'); setError(''); setMessage('') }} className="text-gray-400 hover:text-gold ml-auto">
                Create account
              </button>
            )}
          </div>
        </form>

        <p className="text-center text-xs text-white/20 mt-6">Authorized NHI personnel only</p>
      </div>
    </div>
  )
}

function ResetPasswordPage({ onDone }) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setMessage('Password updated! Signing you in…')
      setTimeout(() => onDone(), 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center pattern-asanoha">
      <div className="absolute inset-0 bg-gradient-to-b from-navy/90 to-navy/95" />
      <div className="relative z-10 w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full kamon-ring bg-navy mx-auto mb-4 flex items-center justify-center overflow-hidden">
            <img src="/nhi-logo.png" alt="NHI" className="w-20 h-20 object-contain" />
          </div>
          <p className="text-gold/70 text-xs tracking-[0.3em] uppercase font-medium">Nippon Hasha Inc.</p>
          <h1 className="text-2xl font-bold text-gofun font-heading mt-1">Set New Password</h1>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1">New Password</label>
            <input type="password" className="input" value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" required minLength={6} />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Confirm New Password</label>
            <input type="password" className="input" value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••" required minLength={6} />
          </div>

          {error && <p className="text-xs text-red-600 bg-red-50 rounded px-3 py-2">{error}</p>}
          {message && <p className="text-xs text-green-600 bg-green-50 rounded px-3 py-2">{message}</p>}

          <button type="submit" className="btn-gold w-full" disabled={loading}>
            {loading ? 'Updating…' : 'Update Password'}
          </button>
        </form>

        <p className="text-center text-xs text-white/20 mt-6">Authorized NHI personnel only</p>
      </div>
    </div>
  )
}
