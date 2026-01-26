import { Link } from 'react-router-dom';
import type { Destination } from '../../data/destinations';

export default function DestinationCards({ items }: { items: Destination[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.id}
          to={`/venues?search=${encodeURIComponent(item.query)}`}
          className="relative overflow-hidden rounded-2xl shadow-md transition-shadow hover:shadow-lg"
        >
          <img
            src={item.image}
            alt={item.alt}
            className="h-56 w-full rounded-2xl object-cover transition-transform duration-300 hover:scale-110"
          />
          <span className="absolute left-0 top-0 rounded-br-2xl rounded-tl-2xl bg-black/50 px-4 py-2 text-xl font-bold uppercase text-white">
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
