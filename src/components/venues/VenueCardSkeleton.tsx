export default function VenueCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl shadow-md">
      <div className="h-60 w-full bg-tertiary/40" />

      <div className="flex flex-col gap-4 p-4">
        <div className="space-y-2">
          <div className="h-6 w-3/4 rounded bg-tertiary/40" />
          <div className="h-4 w-1/2 rounded bg-tertiary/30" />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="h-4 w-16 rounded bg-tertiary/30"></div>
          <div className="h-4 w-16 rounded bg-tertiary/30"></div>
          <div className="h-4 w-16 rounded bg-tertiary/30"></div>
        </div>

        <div className="mt-auto">
          <div className="h-7 w-28 rounded bg-tertiary/40" />
        </div>
      </div>
    </div>
  );
}
