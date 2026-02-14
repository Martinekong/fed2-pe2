export default function CardSkeleton() {
  return (
    <div className="flex h-72 animate-pulse flex-col overflow-hidden rounded-2xl shadow-lg sm:h-40 sm:flex-row">
      <div className="h-40 w-full bg-secondary sm:h-72 sm:w-72" />

      <div className="flex w-full flex-col justify-between p-4">
        <div>
          <div className="h-6 w-2/4 bg-secondary" />
          <div className="mt-2 h-4 w-1/4 bg-secondary" />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="h-4 w-20 rounded bg-secondary"></div>
          <div className="h-4 w-20 rounded bg-secondary"></div>
          <div className="h-4 w-20 rounded bg-secondary"></div>
        </div>
      </div>
    </div>
  );
}
