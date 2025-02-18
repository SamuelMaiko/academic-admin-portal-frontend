import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "../CustomHooks/useLocalStorage";
import instance from "../axios/instance";
import { toast } from "react-toastify";
import Vini from "../assets/Default_pfp.jpg";

const ShareState = createContext();

export const useStateShareContext = () => useContext(ShareState);

const StateContext = ({ children }) => {
  const [shrinkSideBar, setShrinkSideBar] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteWorkModal, setShowDeleteWorkModal] = useState(false);
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showEditPFPModal, setShowEditPFPModal] = useState(false);
  const [showDeleteProfilePhotoModal, setShowDeleteProfilePhotoModal] =
    useState(false);
  const [showDeleteSubmissionModal, setShowDeleteSubmissionModal] =
    useState(false);
  const [showRevokeWorkModal, setShowRevokeWorkModal] = useState(false);
  // I mean the one gliding from the right after nenu icon clik
  const [showMobileNavBar, setShowMobileNavBar] = useState(false);
  const [showMobileSideBar, setShowMobileSideBar] = useState(false);
  const [filters, setFilters] = useLocalStorage("filters", [
    { type: "words", active: false, value: "2000", title: "2000 words" },
    { type: "words", active: false, value: "1500", title: "1500 words" },
    {
      type: "deadline",
      active: false,
      value: "today",
      title: "Deadline Today",
    },
    {
      type: "deadline",
      active: false,
      value: "tomorrow",
      title: "Deadline Tomorrow",
    },
  ]);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showDeactivateAccountModal, setShowDeactivateAccountModal] =
    useState(false);
  // profile picture upload
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useLocalStorage("pfp", "");
  const [upload, setUpload] = useState("");
  const [showCarouselModal, setShowCarouselModal] = useState(false);

  // signup process
  const [success, setSuccess] = useState("");

  // areas to hide mobile NavBar
  const { pathname } = useLocation();
  const AreasToHideMobileNavBar =
    pathname == "/forgot-password" ||
    pathname == "/verify-sent-code" ||
    pathname == "/new-password" ||
    pathname == "/reset-successful";

  // const [showModal, setShowModal] = useState(true);

  const [firstName, setFirstName] = useLocalStorage("firstName", "");
  const [lastName, setLastName] = useLocalStorage("lastName", "");

  const getDetails = async () => {
    try {
      const response = await instance.get("/profile/");
      // console.log(response.data);
      setImageURL(response.data.profile_picture_absolute ?? Vini);
      setFirstName(response.data.first_name);
      setLastName(response.data.last_name);
    } catch (error) {
      if (error.response && error.response.status) {
        const status = error.response.status;
        const message = error.response.data;

        switch (status) {
          case 500:
            toast.error(`Internal server error`);
            break;
          default:
            toast.error(`Error: ${message}`);
            break;
        }
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <ShareState.Provider
      value={{
        shrinkSideBar,
        setShrinkSideBar,
        showDeactivateModal,
        setShowDeactivateModal,
        showDeleteModal,
        setShowDeleteModal,
        showDeleteWorkModal,
        setShowDeleteWorkModal,
        darkMode,
        setDarkMode,
        settingsOpen,
        setSettingsOpen,
        showEditPFPModal,
        setShowEditPFPModal,
        showMobileNavBar,
        setShowMobileNavBar,
        showDeleteProfilePhotoModal,
        setShowDeleteProfilePhotoModal,
        showRevokeWorkModal,
        setShowRevokeWorkModal,
        showMobileSideBar,
        setShowMobileSideBar,
        filters,
        setFilters,
        AreasToHideMobileNavBar,
        showDeleteSubmissionModal,
        setShowDeleteSubmissionModal,
        showDeleteAccountModal,
        setShowDeleteAccountModal,
        showDeactivateAccountModal,
        setShowDeactivateAccountModal,
        // the profile photo upload
        selectedFile,
        setSelectedFile,
        imageURL,
        setImageURL,
        upload,
        setUpload,
        showCarouselModal,
        setShowCarouselModal,
        // signup
        success,
        setSuccess,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        getDetails,
      }}
    >
      {children}
    </ShareState.Provider>
  );
};

StateContext.propTypes = {
  children: PropTypes.node.isRequired,
};
export default StateContext;
