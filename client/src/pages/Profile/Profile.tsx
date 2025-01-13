import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import PersonalData from "../../components/PersonalData/PersonalData";
import style from "./Profile.module.css";
import { useState } from "react";

const Profile = ({}) => {
  return (
    <div>
      <Header />
      <PersonalData />
      <Footer />
    </div>
  );
};

export default Profile;
