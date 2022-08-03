import { Route, Routes } from 'react-router-dom';
// import useAppInit from '../../hooks/useAppInit';
import Navbar from '../components/Navbar';
import NavData from '../nav';

const AppContent = () => {
    return (
        <div className='flex min-h-screen'>
            <Navbar/>
            <main className='flex-1 mt-[64px]'>
                <Routes>
                    {
                        NavData.map((navItem, index) => (
                            <Route 
                                key={index}
                                path={navItem.to}
                                element={<navItem.component />}
                            />
                        ))
                    }
                </Routes>
            </main>
            <footer>

            </footer>
        </div>
    )
};

export default AppContent