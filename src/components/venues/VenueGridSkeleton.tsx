import VenueCardSkeleton from './VenueCardSkeleton';

type Props = {
  count?: number;
};

export default function VenueGridSkeleton({ count = 12 }: Props) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <VenueCardSkeleton key={i} />
      ))}
    </div>
  );
}
