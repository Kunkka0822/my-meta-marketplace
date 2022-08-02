import { BrowserRouter } from 'react-router-dom';
import Root from '../../Root';
import AppContent from './AppContent';

const BaseLayout = () => {
    return (
        <BrowserRouter>
            <Root>
                <AppContent/>
            </Root>
        </BrowserRouter>
    )
}

export default BaseLayout;