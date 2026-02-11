type BookingTotalProps = {
  nights: number;
  totalPrice: number;
};

export default function BookingTotal({
  nights,
  totalPrice,
}: BookingTotalProps) {
  return (
    <div className="flex items-center justify-between">
      <p>Total {nights} nights:</p>
      <p className="font-semibold tracking-wide">$ {totalPrice}</p>
    </div>
  );
}
