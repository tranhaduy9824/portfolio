import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { navLinks } from "../constants";
import { HeaderLogo } from "../icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const NavItems = () => (
  <ul className="nav-ul">
    {navLinks.map(({ id, href, name }) => (
      <a key={id} href={href} className="nav-li_a">
        {name}
      </a>
    ))}
  </ul>
);

const Navbar = () => {
  const [isVolume, setIsVolume] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleVolume = () => {
    setIsVolume(!isVolume);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.8,
        ease: "power1.out",
      });
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.8,
        ease: "power1.in",
      });
    }
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 mx-auto">
      <div className="flex justify-between items-center py-3 mx-auto px-8">
        <a href="/" className="text-black">
          <HeaderLogo className="w-13" />
        </a>

        <div className="flex gap-4 z-30">
          <button
            onClick={toggleVolume}
            className={`w-11 h-11 ${
              isVolume ? "bg-sky-400" : "bg-gray-400"
            } flex items-center justify-center rounded-xl transition-all duration-500 relative overflow-hidden`}
            aria-label="Toggle volume"
          >
            <img
              src={"assets/volume-slash.svg"}
              alt="toggle volume"
              className={`w-5 h-5 absolute transition-opacity duration-500 ${
                isVolume ? "opacity-0" : "opacity-100"
              }`}
            />
            <img
              src={"assets/volume.svg"}
              alt="toggle volume"
              className={`w-5 h-5 absolute transition-opacity duration-500 ${
                isVolume ? "opacity-100" : "opacity-0"
              }`}
            />
          </button>
          <button
            onClick={toggleMenu}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-sky-400 relative overflow-hidden"
            aria-label="Toggle menu"
          >
            <img
              src="assets/menu.svg"
              alt="menu"
              className={`w-5 h-5 absolute transition-opacity duration-500 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <img
              src="assets/close.svg"
              alt="close"
              className={`w-5 h-5 absolute transition-opacity duration-500 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            />
          </button>
        </div>

        <div
          ref={menuRef}
          className="nav-sidebar bg-white"
          style={{
            transform: "translateX(100%)",
            height: "100vh",
            width: "380px",
            padding: "50px 50px 70px",
          }}
        >
          <nav className="flex flex-col h-full">
            <NavItems />
            <div className="flex ">
              <a href="" target="_blank" tabIndex={-1}>
                <FontAwesomeIcon
                  icon={faFacebook}
                  fontSize={30}
                  className="mr-4 text-gray-500 hover-color-change hover:scale-110 transition-all"
                />
              </a>
              <a href="" target="_blank" tabIndex={-1}>
                <FontAwesomeIcon
                  icon={faInstagram}
                  fontSize={30}
                  className="mr-4 text-gray-500 hover-color-change hover:scale-110 transition-all"
                />
              </a>
              <a href="" target="_blank" tabIndex={-1}>
                <FontAwesomeIcon
                  icon={faGithub}
                  fontSize={30}
                  className="mr-4 text-gray-500 hover-color-change hover:scale-110 transition-all"
                />
              </a>
              <a href="" target="_blank" tabIndex={-1}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  fontSize={30}
                  className="mr-4 text-gray-500 hover-color-change hover:scale-110 transition-all"
                />
              </a>
            </div>
            <hr className="my-6" />
            <div className="text-gray-500">
              <span>Music produced by Pixapay</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
