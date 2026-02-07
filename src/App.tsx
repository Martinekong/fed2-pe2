import AppRoutes from './app/routes';
import ToastContainer from './components/ui/Toaster';
import Header from './components/navigation/Header';
import Footer from './components/navigation/Footer';
import ScrollToTop from './components/navigation/ScrollToTop';

function App() {
  return (
    <>
      <ToastContainer />
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
