import { HomeButton, FavoritesButton } from "./sidebar-items";


import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MyLogo } from "../logo";



export const Sidebar = () => {
  

  const navigate = useNavigate();
  const location = useLocation();

  




  return (
    <div className="xs:w-[200px] xs:pl-5 xs:min-h-screen w-full h-fit py-1 px-4 rounded-lg flex flex-col gap-1 xs:gap-0">
      {/*  menu title */}
      <h2 className="hidden xs:block text-3xl font-semibold cursor-default xs:mb-2">MENU</h2>
      <hr className="xs:block hidden border-t border-gray-400 xs:mb-[-3px]" />

      {/* Logo  */}
      <div className="mx-auto xs:hidden transform scale-75 mt-2">
        <MyLogo/>
      </div>

      {/* buttons */}
      <div className="flex xs:flex-col flex-row gap-2 justify-center xs:items-start items-center xs:mb-1">
        <HomeButton />
        <hr className="hidden xs:block border-t border-gray-400 flex-1 h-px w-full border-l-0" />
        <FavoritesButton />
        
      </div>

     
    </div>
  );
};
