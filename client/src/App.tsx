import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Sidebar from './component/Sidebar'
import LiveTelemetry from './pages/LiveTelemetry.tsx'

export default function App() {
    return (<>
        <Sidebar/>
        <div style={{"marginLeft": "30%"}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LiveTelemetry />} />
                </Routes>
            </BrowserRouter>
        </div>
    </>)
}
