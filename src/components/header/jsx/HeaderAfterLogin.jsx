import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../Services/Action/auth.action";
import {
  FiShoppingCart,
  FiSearch,
  FiHeart,
  FiBell,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import "../css/headerAfterLogin.css";
import "../css/headerAfterLogin-responsive.css";


const HeaderAfterLogin = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  // Derive user display info from auth state
  const userName = user?.displayName || user?.email?.split("@")[0] || "User";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = () => {
    closeMenu();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <header className="al-header">
        <div className="al-header-inner">
          {/* Hamburger - mobile only */}
          <button
            className="al-mobile-menu-btn"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          {/* Logo */}
          <Link to="/" className="al-logo" onClick={closeMenu}>
            <img
              src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
              alt="Udemy"
              width="91"
              height="34"
            />
          </Link>

          {/* Explore & Subscribe (desktop) */}
          <div className="al-left-links al-desktop-only">
            <Link to="/explore" className="al-nav-link">
              Explore
            </Link>
            <Link to="/subscribe" className="al-nav-link al-subscribe-link">
              Subscribe
              <span className="al-new-badge">New</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="al-search">
            <div className="al-search-wrapper">
              <FiSearch className="al-search-icon" />
              <input
                type="search"
                placeholder="Search for anything"
                className="al-search-input"
              />
            </div>
          </div>

          {/* Right side nav (desktop) */}
          <nav className="al-nav-right al-desktop-only">
            <Link to="/udemy-business" className="al-nav-link">
              Udemy Business
            </Link>
            <Link to="/teach" className="al-nav-link">
              Teach on Udemy
            </Link>
            <Link to="/add-course" className="al-nav-link" style={{padding:'5px', backgroundColor:"#393774",color:'white',borderRadius:'5px'}}>
              Add course
            </Link>
 

            <Link to="/wishlist" className="al-icon-link" title="Wishlist">
              <FiHeart size={20} />
            </Link>
            <Link to="/cart" className="al-icon-link" title="Cart">
              <FiShoppingCart size={20} />
            </Link>
            <button className="al-icon-link" title="Notifications">
              <FiBell size={20} />
              <span className="al-notif-dot"></span>
            </button>

            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={userName}
                className="al-user-avatar"
                style={{ objectFit: "cover" }}
                title={userName}
              />
            ) : (
              <Link to="/profile" className="al-user-avatar" title={userName}>
                {initials}
              </Link>
            )}

            <button
              className="al-icon-link"
              title="Log out"
              onClick={handleLogout}
              id="logout-btn"
            >
              <FiLogOut size={20} />
            </button>
          </nav>

          {/* Mobile right icons */}
          <div className="al-mobile-right-icons">
            <Link to="/cart" className="al-icon-link">
              <FiShoppingCart size={20} />
            </Link>
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={userName}
                className="al-user-avatar-sm"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <Link to="/profile" className="al-user-avatar-sm">
                {initials}
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`al-overlay ${mobileMenuOpen ? "open" : ""}`}
        onClick={closeMenu}
      />

      {/* Mobile slide-out menu */}
      <nav className={`al-mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="al-mobile-menu-header">
          <Link to="/" className="al-logo" onClick={closeMenu}>
            <img
              src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
              alt="Udemy"
              width="91"
              height="34"
            />
          </Link>
          <button
            className="al-mobile-close-btn"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <FiX size={22} />
          </button>
        </div>

        <div className="al-mobile-user-info">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={userName}
              className="al-mobile-avatar"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="al-mobile-avatar">{initials}</div>
          )}
          <div className="al-mobile-user-details">
            <span className="al-mobile-user-name">{userName}</span>
          </div>
        </div>

        <div className="al-mobile-section">
          <h4 className="al-mobile-section-title">Learn</h4>
          
          <Link
            to="/my-learning"
            className="al-mobile-link"
            onClick={closeMenu}
          >
            My learning
          </Link>

          <Link to="/explore" className="al-mobile-link" onClick={closeMenu}>
            Explore
          </Link>
          <Link to="/subscribe" className="al-mobile-link" onClick={closeMenu}>
            Subscribe
          </Link>
        </div>

        <div className="al-mobile-section">
          <h4 className="al-mobile-section-title">More from Udemy</h4>
          <Link
            to="/udemy-business"
            className="al-mobile-link"
            onClick={closeMenu}
          >
            Udemy Business
          </Link>
          <Link to="/teach" className="al-mobile-link" onClick={closeMenu}>
            Teach on Udemy
          </Link>
        </div>

        <div className="al-mobile-section">
          <h4 className="al-mobile-section-title">Account</h4>
          <Link to="/wishlist" className="al-mobile-link" onClick={closeMenu}>
            Wishlist
          </Link>
          <Link
            to="/notifications"
            className="al-mobile-link"
            onClick={closeMenu}
          >
            Notifications
          </Link>
          <Link to="/profile" className="al-mobile-link" onClick={closeMenu}>
            Profile
          </Link>
          <button
            className="al-mobile-link"
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
              fontFamily: "inherit",
              color: "#e74c3c",
              fontWeight: 600,
            }}
          >
            Log Out
          </button>
        </div>
      </nav>
    </>
  );
};

export default HeaderAfterLogin;
