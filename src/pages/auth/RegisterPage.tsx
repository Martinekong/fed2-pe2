import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { register } from '../../api/auth';
import { ApiError } from '../../api/client';
import { registerSchema } from '../../lib/validation';

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
};

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    const result = registerSchema.safeParse({ name, email, password });

    if (result.success) {
      setErrors({});
      return { ok: true as const, data: result.data };
    }

    const fieldErrors: FieldErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (field === 'name' || field === 'email' || field === 'password') {
        fieldErrors[field] = issue.message;
      }
    }

    setErrors(fieldErrors);
    return { ok: false as const };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setApiError(null);

    const validation = validate();
    if (!validation.ok) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      await register(validation.data);
      toast.success('Account created! You can now log in.');
      navigate('/login');
    } catch (err) {
      err instanceof ApiError
        ? setApiError(err.message)
        : setApiError('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass = (hasError: boolean) =>
    `input-field ${hasError ? 'input-field-error' : ''}`;

  return (
    <div className="mx-auto flex max-w-[450px] flex-col items-center px-4">
      <h1 className="mb-8">Register</h1>

      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center gap-10"
      >
        <label className="flex w-full flex-col">
          Username
          <input
            className={inputClass(Boolean(errors.name))}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="KariNordmann"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="pl-4 pt-2 text-sm text-error">{errors.name}</p>
          )}
        </label>

        <label className="flex w-full flex-col">
          Email
          <input
            className={inputClass(Boolean(errors.email))}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter stud.noroff.no email"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="pl-4 pt-2 text-sm text-error">{errors.email}</p>
          )}
        </label>

        <label className="flex w-full flex-col">
          Password
          <input
            className={inputClass(Boolean(errors.password))}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            disabled={isSubmitting}
          />
          {errors.password && (
            <p className="pl-4 pt-2 text-sm text-error">{errors.password}</p>
          )}
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="primary-btn w-full"
        >
          {isSubmitting ? 'Signing up...' : 'Sign up'}
        </button>

        {apiError && <p className="text-error">{apiError}</p>}

        <p>
          Already have an account?{' '}
          <Link to="/login" className="font-bold">
            Log in!
          </Link>
        </p>
      </form>
    </div>
  );
}
