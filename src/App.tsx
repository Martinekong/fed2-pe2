import AppRoutes from './app/routes';
import ToastContainer from './components/ui/ToastContainer';
import Header from './components/navigation/Header';
import Footer from './components/navigation/Footer';
import ScrollToTop from './components/navigation/ScrollToTop';
import ScrollToTopButton from './components/navigation/ScrollToTopButton';

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <main>
        <ScrollToTop />
        <AppRoutes />
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}

export default App;
