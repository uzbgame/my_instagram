import React, { useEffect } from "react";
import Timeline from "../../components/StoriesTime/Timeline";
import Sidebar from "./../../components/Sidebar/index";
import '../../RegisterPages/layouts.css'

const HomePage = () => {
  useEffect(() => {
    document.title = "My Instagram";
  }, []);

  return (
    <div className="home bg-gray-background bagground">
      <div className="grid  grid-cols-2 w-full mx-auto max-w-screen-lg">
        <Sidebar />
        <Timeline />
      </div>
    </div>
  );
};

export default HomePage;
