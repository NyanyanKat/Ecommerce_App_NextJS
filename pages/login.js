// @ts-ignore
import Link from 'next/link';
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
// @ts-ignore
import { useForm } from 'react-hook-form';
// @ts-ignore
import { signIn, useSession } from 'next-auth/react';
import { getError } from '../utils/error';
// @ts-ignore
import { toast } from 'react-toastify';
// @ts-ignore
import { useRouter } from 'next/router';

export default function LoginScreen() {
  const { data: session } = useSession();
  const router = useRouter();

  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl font-bold">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="w-full"
            id="email"
            autoFocus
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
          />
          {errors.email && (
            <div className="text-red-700">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="w-full"
            id="password"
            autoFocus
            {...register('password', {
              required: 'Please enter password',
              minLength: {
                value: 6,
                message: 'Password must be more than 5 characters',
              },
            })}
          />
          {errors.password && (
            <div className="text-red-700">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4">
          Don't have an account?&nbsp;
          <Link href="register">
            <a className="cursor-pointer">Register</a>
          </Link>
        </div>
      </form>
    </Layout>
  );
}
