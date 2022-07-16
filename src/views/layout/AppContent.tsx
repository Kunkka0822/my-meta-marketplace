import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { publicPaths } from '../nav';

const AppContent = () => {
    return (
        <div className='flex min-h-screen'>
            <Navbar/>
            <main className='flex-1'>
                <Routes>
                    {
                        publicPaths.map((navItem, index) => (
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