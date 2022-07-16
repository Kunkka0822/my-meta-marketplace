import { BrowserRouter } from 'react-router-dom';
import AppContent from './AppContent';

const BaseLayout = () => {
    return (
        <BrowserRouter>
            <AppContent/>
        </BrowserRouter>
    )
}

export default BaseLayout;