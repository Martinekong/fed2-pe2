import PlaceholderImg from '../../assets/placeholder_image.jpg';

type Props = {
  name?: string;
  avatarUrl?: string;
  avatarAlt?: string;
};

export default function VenueOwner({ name, avatarUrl, avatarAlt }: Props) {
  const safeName = name ?? 'Unknown';
  const safeUrl = avatarUrl ?? PlaceholderImg;
  const safeAlt = avatarAlt ?? safeName;

  return (
    <div>
      <h3>Venue Owner</h3>
      <div className="flex items-center gap-4 pt-4">
        <img
          src={safeUrl}
          alt={safeAlt}
          className="h-10 w-10 rounded-full object-cover"
        />
        <p>{safeName}</p>
      </div>
    </div>
  );
}
