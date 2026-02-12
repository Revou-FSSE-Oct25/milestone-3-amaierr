'use client';

import { redirect, useSearchParams } from 'next/navigation';
import { LoginData, loginAction } from './actions';
import { useTransition, Suspense } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/products';
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: LoginData) => {
    startTransition(async () => {
      const result = await loginAction(data)
      if (!result.success) {
        setError('root', {
          type: 'manual',
          message: result.message,
        });
        return;
      }
      redirect(callbackUrl)
    });
  }
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginData>()

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b] px-6">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-8 shadow-2xl">
        <h1 className="text-2xl font-semibold text-white mb-8">
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* EMAIL */}
          <div className="relative">
            <input
              type="email"
              placeholder=" "
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Enter a valid email',
                },
              })}
              disabled={isPending}
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
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              type="password"
              placeholder=" "
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Minimum 6 characters',
                },
              })}
              disabled={isPending}
              className={`peer w-full rounded-lg bg-zinc-800 border px-4 pt-6 pb-2 text-white outline-none transition
                ${errors.password
                  ? 'border-red-500'
                  : 'border-zinc-700 focus:border-white'}
              `}
            />
            <label className="absolute left-4 top-2 text-sm text-zinc-400 transition-all peer-placeholder-shown:top-4
              peer-placeholder-shown:text-base
              peer-focus:top-2
              peer-focus:text-sm
              peer-focus:text-white">
              Password
            </label>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-white py-3 font-semibold text-black transition hover:bg-zinc-200 active:scale-[0.98]"
          >
            {isPending ? 'Logging In...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-sm text-zinc-400 text-center">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-white hover:underline">
            Sign up
          </Link>
        </p>

        {errors.root && (
          <p className="text-sm text-red-500 text-center">
            {errors.root.message}
          </p>
        )}
      </div>
    </div>
  );
}