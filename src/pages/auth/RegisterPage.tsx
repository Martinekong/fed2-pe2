import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { register } from '../../api/auth';
import { ApiError } from '../../api/client';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await register({ name, email, password });
      toast.success('Account created! You can now log in.');
      navigate('/login');
    } catch (err) {
      if (err instanceof ApiError) {
        toast.error(err.message);
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="KariNordmann"
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter stud.noroff.no email"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </label>

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
