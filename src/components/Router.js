import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Banner from "./Banner";
import Error404 from "./Error404";
import WeatherMap from "./WeatherMap";

export default function Router() {
  return (
      <BrowserRouter>
          <Routes> 
              <Route exect path="/wethermap/" element={<Banner/>} />
              <Route path="/wethermap/city/:city" element={<WeatherMap/>} />
            <Route path="*" element={<Error404 />} />
          </Routes>
      </BrowserRouter>
  );
}


