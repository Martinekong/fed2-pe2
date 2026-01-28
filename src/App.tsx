import AppRoutes from './app/routes';
import { Toaster } from 'react-hot-toast';
import Header from './components/navigation/Header';
import Footer from './components/navigation/Footer';
import ScrollToTop from './components/navigation/ScrollToTop';

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <Header />
      <main>
        <ScrollToTop />
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
}

export default App;
