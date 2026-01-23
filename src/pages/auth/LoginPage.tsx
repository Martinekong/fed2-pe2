import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { login } from '../../api/auth';
import { ApiError } from '../../api/client';
import { loginSchema } from '../../lib/validation';
import Button from '../../components/ui/Buttons';

type FieldErrors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
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

    setApiError(null);

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
      <h1 className="mb-8">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center gap-10"
      >
        <label className="flex w-full flex-col">
          Email
          <input
            className={inputClass(Boolean(errors.email))}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your stud.noroff.no email"
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
            placeholder="Your password"
            disabled={isSubmitting}
          />
          {errors.password && (
            <p className="pl-4 pt-2 text-sm text-error">{errors.password}</p>
          )}
        </label>

        <Button
          variant="primary"
          type="submit"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Log in'}
        </Button>

        {apiError && <p className="text-error">{apiError}</p>}

        <p>
          Don't have an account?{' '}
          <Link to="/register" className="font-bold">
            Register!
          </Link>
        </p>
      </form>
    </div>
  );
}
