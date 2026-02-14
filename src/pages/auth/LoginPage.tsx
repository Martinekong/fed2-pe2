import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuth } from '../../app/authContext';

import { login } from '../../api/auth';
import { loginSchema } from '../../lib/authValidation';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { getErrorMessage } from '../../api/getErrorMessage';

type FieldErrors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

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
    if (isSubmitting) return;

    const validation = validate();
    if (!validation.ok) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    setIsSubmitting(true);

    try {
      const user = await login(validation.data);
      setAuth({ token: user.accessToken, username: user.name });
      toast.success(`Welcome back ${user.name}`);
      navigate('/');
    } catch (err) {
      toast.error(
        getErrorMessage(err, 'Something went wrong. Please try again'),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page-wrapper max-w-[450px] items-center">
      <h1>Login</h1>

      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center gap-10"
      >
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your stud.noroff.no email"
          disabled={isSubmitting}
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          disabled={isSubmitting}
          error={errors.password}
        />

        <Button
          variant="primary"
          type="submit"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Log in'}
        </Button>

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
