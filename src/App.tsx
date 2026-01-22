import AppRoutes from './app/routes';
import { Toaster } from 'react-hot-toast';
import Header from './components/navigation/Header';

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <Header />
      <main>
        <AppRoutes />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
