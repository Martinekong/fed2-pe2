export default function VenueCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl shadow-md">
      <div className="h-60 w-full bg-secondary" />

      <div className="flex flex-col gap-4 p-4">
        <div className="space-y-2">
          <div className="h-6 w-3/4 rounded bg-secondary" />
          <div className="h-4 w-1/2 rounded bg-secondary" />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="h-4 w-16 rounded bg-secondary"></div>
          <div className="h-4 w-16 rounded bg-secondary"></div>
          <div className="h-4 w-16 rounded bg-secondary"></div>
        </div>

        <div className="mt-auto">
          <div className="h-7 w-28 rounded bg-secondary" />
        </div>
      </div>
    </div>
  );
}
