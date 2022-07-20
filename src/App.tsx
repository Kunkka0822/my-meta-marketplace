import BaseLayout from "./views/layout/BaseLayout";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return <>
    <BaseLayout/>
    <ToastContainer />
  </>;
}

export default App;
