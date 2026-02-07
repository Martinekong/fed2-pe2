import { Toaster } from 'react-hot-toast';

export default function ToastContainer() {
  return (
    <Toaster
      position="bottom-right"
      containerStyle={{ bottom: 30, right: 30 }}
      toastOptions={{
        duration: 5000,
        style: {
          background: 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          color: 'rgba(255, 255, 255, 0.90)',
          borderRadius: '16px',
          padding: '12px 32px 12px 16px',
          fontSize: '14px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 16px 32px rgba(0, 0, 0, 0.30)',
        },
        success: {
          iconTheme: {
            primary: '#B0F4A6',
            secondary: '#0b0b0b',
          },
        },
        error: {
          iconTheme: {
            primary: '#F4A6A6',
            secondary: '#0b0b0b',
          },
        },
      }}
    />
  );
}
