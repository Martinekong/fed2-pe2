import { nightsBetween, formatDateRange } from '../../utils/date';

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

type Props = {
  name: string;
  guests: number;
  price: number;
  dateFrom: string;
  dateTo: string;
};

export default function BookingDetails({
  name,
  guests,
  price,
  dateFrom,
  dateTo,
}: Props) {
  const nights = nightsBetween(dateFrom, dateTo);
  const dateRange = formatDateRange(dateFrom, dateTo);

  return (
    <>
      <div className="flex items-center gap-4">
        <PersonOutlineOutlinedIcon fontSize="small" />
        <p>{name}</p>
      </div>
      <div className="flex items-center gap-4">
        <BedOutlinedIcon fontSize="small" />
        <p>{guests} guests</p>
      </div>
      <div className="flex items-center gap-4">
        <BedtimeOutlinedIcon fontSize="small" />
        <p>{nights} nights</p>
      </div>
      <div className="flex items-center gap-4">
        <AccountBalanceWalletOutlinedIcon fontSize="small" />
        <p>${price} per night </p>
      </div>
      <div className="flex items-center gap-4">
        <CalendarMonthOutlinedIcon fontSize="small" />
        <p>{dateRange}</p>
      </div>
    </>
  );
}
