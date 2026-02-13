type Props = {
  price: number;
};

export default function VenuePrice({ price }: Props) {
  return (
    <div className="flex items-center gap-1">
      <p className="text-4xl font-bold">${price}</p>
      <p className="pt-4 text-sm">/ night</p>
    </div>
  );
}
