import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

type Props = {
  text?: string;
};

export default function LoadingLine({ text }: Props) {
  return (
    <Box sx={{ width: '100%' }}>
      {text && <p className="pb-1 text-sm tracking-wide">{text}</p>}
      <LinearProgress
        sx={{
          height: 4,
          borderRadius: 999,
          backgroundColor: 'transparent',
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'rgb(44 103 84)',
            borderRadius: 999,
          },
        }}
      />
    </Box>
  );
}
