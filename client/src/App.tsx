import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Sidebar from './component/Sidebar'
import LiveTelemetry from './pages/LiveTelemetry'
import 'bootstrap/dist/css/bootstrap.min.css';
import ArchivedTelemetry from './pages/ArchivedTelemetry';
import Charts from './pages/Charts';
import Strategy from './pages/Strategy';
import CountLaps from './pages/CountLaps';

export default function App() {
    return (<>
            <BrowserRouter>
                <Sidebar/>
                <div className='page-content'>
                    <Routes>
                        <Route path="/history" element={<ArchivedTelemetry />} />
                        <Route path="/strategy" element={<Strategy />} />
                        <Route path="/count" element={<CountLaps />} />
                        <Route path="*" element={<LiveTelemetry />} />
                    </Routes>
                </div>
            </BrowserRouter>
    </>)
}
