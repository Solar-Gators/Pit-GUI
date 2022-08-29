import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Sidebar from './component/Sidebar'
import LiveTelemetry from './pages/LiveTelemetry'
import 'bootstrap/dist/css/bootstrap.min.css';
import ArchivedTelemetry from './pages/ArchivedTelemetry';

export default function App() {
    return (<>
            <BrowserRouter>
                <Sidebar/>
                <div style={{"marginLeft": "25%", "marginRight": "5%"}}>
                    <Routes>
                        <Route path="/history" element={<ArchivedTelemetry />} />
                        <Route path="*" element={<LiveTelemetry />} />
                    </Routes>
                </div>
            </BrowserRouter>
    </>)
}
