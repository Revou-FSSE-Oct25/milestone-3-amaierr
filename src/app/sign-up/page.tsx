'use client'

import { useForm } from 'react-hook-form'
import Link from 'next/link'

type SignupForm = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupForm>()

  const onSubmit = (data: SignupForm) => {
    console.log(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b] px-6">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-8 shadow-2xl">
        <h1 className="text-2xl font-semibold text-white mb-8">
          Create Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* NAME */}
          <div className="relative">
            <input
              type="text"
              placeholder=" "
              {...register('name', { required: 'Name is required' })}
              className={`peer w-full rounded-lg bg-zinc-800 border px-4 pt-6 pb-2 text-white outline-none transition
                ${errors.name
                  ? 'border-red-500'
                  : 'border-zinc-700 focus:border-white'}
              `}
            />
            <label className="absolute left-4 top-2 text-sm text-zinc-400 transition-all
              peer-placeholder-shown:top-4
              peer-placeholder-shown:text-base
              peer-focus:top-2
              peer-focus:text-sm
              peer-focus:text-white">
              Name
            </label>
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div className="relative">
            <input
              type="email"
              placeholder=" "
              {...register('email', {
                required: 'Email is required',
              })}
              className={`peer w-full rounded-lg bg-zinc-800 border px-4 pt-6 pb-2 text-white outline-none transition
                ${errors.email
                  ? 'border-red-500'
                  : 'border-zinc-700 focus:border-white'}
              `}
            />
            <label className="absolute left-4 top-2 text-sm text-zinc-400 transition-all
              peer-placeholder-shown:top-4
              peer-placeholder-shown:text-base
              peer-focus:top-2
              peer-focus:text-sm
              peer-focus:text-white">
              Email
            </label>
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              type="password"
              placeholder=" "
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
              })}
              className={`peer w-full rounded-lg bg-zinc-800 border px-4 pt-6 pb-2 text-white outline-none transition
                ${errors.password
                  ? 'border-red-500'
                  : 'border-zinc-700 focus:border-white'}
              `}
            />
            <label className="absolute left-4 top-2 text-sm text-zinc-400 transition-all
              peer-placeholder-shown:top-4
              peer-placeholder-shown:text-base
              peer-focus:top-2
              peer-focus:text-sm
              peer-focus:text-white">
              Password
            </label>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <input
              type="password"
              placeholder=" "
              {...register('confirmPassword', {
                required: 'Confirm your password',
                validate: (value) =>
                  value === watch('password') || 'Passwords do not match',
              })}
              className={`peer w-full rounded-lg bg-zinc-800 border px-4 pt-6 pb-2 text-white outline-none transition
                ${errors.confirmPassword
                  ? 'border-red-500'
                  : 'border-zinc-700 focus:border-white'}
              `}
            />
            <label className="absolute left-4 top-2 text-sm text-zinc-400 transition-all
              peer-placeholder-shown:top-4
              peer-placeholder-shown:text-base
              peer-focus:top-2
              peer-focus:text-sm
              peer-focus:text-white">
              Confirm Password
            </label>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-white py-3 font-semibold text-black transition hover:bg-zinc-200 active:scale-[0.98]"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-sm text-zinc-400 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-white hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage