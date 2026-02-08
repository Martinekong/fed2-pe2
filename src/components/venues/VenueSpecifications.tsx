import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import LocalParkingOutlinedIcon from '@mui/icons-material/LocalParkingOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';

type Meta = {
  wifi?: boolean;
  breakfast?: boolean;
  parking?: boolean;
  pets?: boolean;
};

type Props = {
  maxGuests?: number;
  meta?: Meta;
};

function Specification({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-tertiary bg-white p-4">
      {icon}
      <p className="text-sm">{children}</p>
    </div>
  );
}

export default function VenueSpecifications({ maxGuests, meta }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h3>Specifications</h3>

      <Specification icon={<BedOutlinedIcon fontSize="small" />}>
        up to {maxGuests} guests
      </Specification>

      {meta?.wifi && (
        <Specification icon={<WifiOutlinedIcon fontSize="small" />}>
          Wifi
        </Specification>
      )}

      {meta?.breakfast && (
        <Specification icon={<RestaurantOutlinedIcon fontSize="small" />}>
          Breakfast
        </Specification>
      )}

      {meta?.parking && (
        <Specification icon={<LocalParkingOutlinedIcon fontSize="small" />}>
          Parking
        </Specification>
      )}

      {meta?.pets && (
        <Specification icon={<PetsOutlinedIcon fontSize="small" />}>
          Pets allowed
        </Specification>
      )}
    </div>
  );
}
