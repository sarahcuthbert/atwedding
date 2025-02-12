import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {EventDetails} from "./pages/EventDetails.tsx";
import {RSVP} from "./pages/RSVP.tsx";
import {Schedule} from "./pages/Schedule.tsx";
import {FAQ} from "./pages/FAQ.tsx";
import {Layout} from "./components/Layout.tsx";

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/event-details" element={<EventDetails/>}/>
                    <Route path="/rsvp" element={<RSVP/>}/>
                    <Route path="/schedule" element={<Schedule/>}/>
                    <Route path="/faq" element={<FAQ/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App
