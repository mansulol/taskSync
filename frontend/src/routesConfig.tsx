import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import HomePage from '@pages/home.page'

export default function RoutesConfig() {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </Router>
    )
}