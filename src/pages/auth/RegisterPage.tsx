import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { register } from '../../api/auth';
import { ApiError } from '../../api/client';
import { registerSchema } from '../../lib/validation';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

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

  const [venueManager, setVenueManager] = useState(false);

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
      toast.error('Please fix the errors in the form.');
      return;
    }

    setIsSubmitting(true);

    try {
      await register({ ...validation.data, venueManager });
      toast.success('Account created! You can now log in.');
      navigate('/login');
    } catch (err) {
      err instanceof ApiError
        ? setApiError(err.message)
        : setApiError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="m-8 mx-auto flex max-w-[450px] flex-col items-center px-4">
      <h1 className="mb-8">Register</h1>

      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center gap-10"
        autoComplete="off"
      >
        <Input
          label="Username"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="KariNordmann"
          disabled={isSubmitting}
          error={errors.name}
          autoComplete="off"
        />

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter stud.noroff.no email"
          disabled={isSubmitting}
          error={errors.email}
          autoComplete="off"
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          disabled={isSubmitting}
          error={errors.password}
          autoComplete="new-password"
        />

        <label className="flex w-full items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="font-medium">Venue manager</span>
            <span className="text-sm opacity-70">
              I want to create and manage venues
            </span>
          </div>

          <button
            type="button"
            onClick={() => setVenueManager((v) => !v)}
            aria-pressed={venueManager}
            className={`relative h-10 w-20 rounded-full shadow-md transition duration-300 hover:shadow-lg ${venueManager ? 'bg-primary' : 'bg-tertiary'}`}
            disabled={isSubmitting}
          >
            <span
              className={`absolute top-1 h-8 w-8 rounded-full bg-white transition duration-300 ${venueManager ? 'left-11' : 'left-1'}`}
            />
          </button>
        </label>

        <Button
          variant="primary"
          type="submit"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing up...' : 'Sign up'}
        </Button>

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
