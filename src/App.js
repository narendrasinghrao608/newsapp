import "./App.css";
import React, { useState} from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App =()=> {
  const apikey=process.env.REACT_APP_NEWS_API
  // state={
  //   progress:0
  // }
  const [progress,setProgress]=useState(0)
  // setProgress=(progress)=>{
  //   setState({progress:progress})
  // }
  // render() {
    return (
      <div>
      <Router>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Routes>
          <Route  exact path='/' element={<News setProgress={setProgress} apikey={apikey} key="general" country="in" category="general"/>} />
          <Route exact path="/business" element={<News setProgress={setProgress} apikey={apikey} key="business" country="in" category="business"/>} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apikey={apikey} key="entertainment" country="in" category="entertainment"/>} />
          <Route exact path="/health" element={<News setProgress={setProgress} apikey={apikey} key="health" country="in" category="health"/>} />
          <Route exact path="/science" element={<News setProgress={setProgress} apikey={apikey}key="science"  country="in" category="science"/>} />
          <Route exact path="/sport" element={<News setProgress={setProgress} apikey={apikey} key="sport" country="in" category="sport"/>} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apikey={apikey} key="technology" country="in" category="technology"/>} />

        </Routes>
      </Router>
      </div>
    );
  // }
}
export default App;
