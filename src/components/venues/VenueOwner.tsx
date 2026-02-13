import SafeImage from '../ui/SafeImage';

type Props = {
  name?: string;
  avatarUrl?: string;
  avatarAlt?: string;
};

export default function VenueOwner({ name, avatarUrl, avatarAlt }: Props) {
  const safeName = name ?? 'Unknown';

  return (
    <div>
      <h3>Venue Owner</h3>
      <div className="flex items-center gap-4 pt-4">
        <SafeImage
          src={avatarUrl}
          alt={avatarAlt || safeName}
          className="h-10 w-10 rounded-full object-cover"
        />
        <p>{safeName}</p>
      </div>
    </div>
  );
}
