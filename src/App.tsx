import AppRoutes from './app/routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <header></header>
      <main>
        <AppRoutes />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
