import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import useAppInit from '../../hooks/useAppInit';
import Navbar from '../components/Navbar';
import { publicPaths } from '../nav';

const AppContent = () => {
    const [inited, init] = useAppInit();
    useEffect(() => {
        if (!inited) {
            init();
        }
    }, [init, inited])
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