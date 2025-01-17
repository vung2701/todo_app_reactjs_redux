import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import AppRouter from './routers/AppRouter';
import Loading from './components/loading/Loading';

function App() {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  return <>{isLoading ? <Loading /> : <AppRouter />}</>;
}

export default App;
