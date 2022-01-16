import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import EditProgram from './pages/EditProgram';
import NewProgram from './pages/NewProgram';
import Program from './pages/Program';
import Programs from './pages/Programs';

export default function App(): JSX.Element {
    return (
        <BrowserRouter>
            <NavigationBar />

            <Routes>
                <Route path="programs">
                    <Route path=":programId" element={<Program />} />
                    <Route path=":programId/edit" element={<EditProgram />} />
                    <Route path="new" element={<NewProgram />} />
                    <Route index element={<Programs />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
