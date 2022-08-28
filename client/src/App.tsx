import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Sidebar from './component/Sidebar'
import LiveTelemetry from './pages/LiveTelemetry'
import 'bootstrap/dist/css/bootstrap.min.css';
import ArchivedTelemetry from './pages/ArchivedTelemetry';

export default function App() {
    return (<>
        <Sidebar/>
        <div style={{"marginLeft": "30%"}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/history" element={<ArchivedTelemetry />} />
                    <Route path="*" element={<LiveTelemetry />} />
                </Routes>
            </BrowserRouter>
        </div>
    </>)
}
