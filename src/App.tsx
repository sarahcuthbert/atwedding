import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {EventDetails} from "./pages/EventDetails.tsx";
import {RSVP} from "./pages/RSVP.tsx";
import {Schedule} from "./pages/Schedule.tsx";
import {FAQ} from "./pages/FAQ.tsx";
import {Header} from "./components/Header.tsx";


function App() {

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/event-details" element={<EventDetails/>}/>
                <Route path="/rsvp" element={<RSVP/>}/>
                <Route path="/schedule" element={<Schedule/>}/>
                <Route path="/faq" element={<FAQ/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
