import Pagination from '@mui/material/Pagination';
import { useMediaQuery, useTheme } from '@mui/material';

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function MuiPagination({
  page,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="mx-auto mt-6">
      <Pagination
        page={page}
        count={totalPages}
        onChange={(_, p) => onPageChange(p)}
        shape="rounded"
        size={isSmall ? 'small' : 'medium'}
        sx={{
          '& .MuiPaginationItem-root': {
            borderRadius: '100%',
            fontFamily: 'lato',
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
            color: 'white',
            fontWeight: '500',
            borderRadius: '100%',
          },
        }}
      />
    </div>
  );
}
