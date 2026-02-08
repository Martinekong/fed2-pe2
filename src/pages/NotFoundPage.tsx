import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="page-wrapper flex items-center">
      <div className="relative z-10 flex flex-col items-center p-10 text-center">
        <p className="text-small tracking-widest opacity-80">404</p>

        <h1 className="mb-8 font-bold tracking-wider">
          Looks like you're lost
        </h1>

        <p className="mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col gap-4">
          <Link to="/" className="mt-6">
            <Button variant="primary" className="w-48">
              Back to home
            </Button>
          </Link>
          <Link to="/venues">
            <Button variant="secondary" className="w-48">
              Browse venues
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
