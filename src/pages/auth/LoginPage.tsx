import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { login } from '../../api/auth';
import { ApiError } from '../../api/client';
import { loginSchema } from '../../lib/validation';

type FieldErrors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    const result = loginSchema.safeParse({ email, password });

    if (result.success) {
      setErrors({});
      return { ok: true as const, data: result.data };
    }

    const fieldErrors: FieldErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (field === 'email' || field === 'password') {
        fieldErrors[field] = issue.message;
      }
    }

    setErrors(fieldErrors);
    return { ok: false as const };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validation = validate();
    if (!validation.ok) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      const user = await login(validation.data);
      toast.success(`Welcome back ${user.name}`);
      navigate('/');
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : 'Something went wrong',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass = (hasError: boolean) =>
    `border rounded px-3 py-2 ${hasError ? 'border-red-500' : 'border-gray-300'}`;

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            className={inputClass(Boolean(errors.email))}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your stud.noroff.no email"
          />
        </label>
        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}

        <label>
          Password
          <input
            className={inputClass(Boolean(errors.password))}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
        </label>
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password}</p>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Log in'}
        </button>

        <p>
          Don't have an account? <Link to="/register">Register!</Link>
        </p>
      </form>
    </>
  );
}
