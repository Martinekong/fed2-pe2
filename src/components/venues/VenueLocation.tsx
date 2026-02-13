import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';

type Props = {
  city?: string;
  country?: string;
};

export default function VenueLocation({ city, country }: Props) {
  const safeCity = city ?? 'Unknown';
  const safeCountry = country ?? 'Unknown';

  return (
    <div className="flex opacity-70">
      <FmdGoodOutlinedIcon fontSize="small" />
      <p className="text-sm">
        {safeCity}, {safeCountry}
      </p>
    </div>
  );
}
