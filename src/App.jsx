import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Body } from "./components/body.component";
import { Login } from "./components/login";
import { Profile } from "./components/profile";
import { Provider } from "react-redux";
import appStore from "./utils/app-store";
import Feed from "./components/feed";
import EditProfile from "./components/editProfile";
import Connections from "./components/connections";
import Requests from "./components/requests";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              {/* // children routes */}
              <Route path="/login" element={<Login />}></Route>
              <Route path="/feed" element={<Feed />}></Route>
              <Route path="/profile" element={<EditProfile />}></Route>
              <Route path="/connections" element={<Connections />}></Route>
              <Route path="/requests" element={<Requests />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
