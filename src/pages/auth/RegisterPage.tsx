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
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            className={inputClass(Boolean(errors.name))}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="KariNordmann"
          />
        </label>
        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}

        <label>
          Email
          <input
            className={inputClass(Boolean(errors.email))}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter stud.noroff.no email"
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
            placeholder="Enter password"
          />
        </label>
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password}</p>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing up...' : 'Sign up'}
        </button>

        <p>
          Already have an account? <Link to="/login">Log in!</Link>
        </p>
      </form>
    </>
  );
}
