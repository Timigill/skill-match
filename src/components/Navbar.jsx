"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "react-feather";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  const links = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Find Jobs", path: "/jobs" },
    { name: "Browse Companies", path: "/companies" },
    { name: "Pricing", path: "/pricing" },
    { name: "Resources", path: "/resources", dropdown: true },
    { name: "Contact Us", path: "/contact" },
  ];

  const dropdownLinks = [
    { name: "Blog", path: "/blog" },
    { name: "FAQs", path: "/faqs" },
    { name: "How It Works", path: "/how-it-works" },
  ];

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow fixed-top py-3">
        <div className="container">
          <button
            className="navbar-toggler border-0 order-0"
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Toggle navigation"
          >
            <Menu size={24} className="text-dark" />
          </button>

          <Link href="/" className="navbar-brand mx-auto mx-lg-0 order-1">
            <img src="/logo.svg" alt="Logo" className="h-5 w-auto" />
          </Link>

          <div className="collapse navbar-collapse justify-content-center order-2">
            <ul className="navbar-nav">
              {links.map((link) => (
                <li
                  key={link.name}
                  className="nav-item position-relative"
                  onMouseEnter={() =>
                    link.dropdown && setOpenDropdown(link.name)
                  }
                  onMouseLeave={() => link.dropdown && setOpenDropdown(null)}
                >
                  {link.dropdown ? (
                    <>
                      <button
                        className="nav-link text-dark fw-medium d-flex align-items-center gap-1"
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === link.name ? null : link.name
                          )
                        }
                        aria-expanded={openDropdown === link.name}
                      >
                        {link.name}
                        <ChevronDown size={16} />
                      </button>
                      <ul
                        className={`dropdown-menu shadow border-0 ${
                          openDropdown === link.name ? "show" : ""
                        }`}
                      >
                        {dropdownLinks.map((dropdown) => (
                          <li key={dropdown.name}>
                            <Link
                              href={dropdown.path}
                              className="dropdown-item py-2"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {dropdown.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={link.path}
                      className="nav-link text-dark fw-medium"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="d-none d-lg-flex gap-2 order-3">
            <button className="btn login-btn rounded-pill px-4 border">
              Login
            </button>
            <button className="btn trial-btn rounded-pill px-4">
              Start Free Trial
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-sidebar ${mobileMenuOpen ? "open" : ""}`}>
        <ul className="mobile-nav">
          {links.map((link) => (
            <li key={link.name}>
              {link.dropdown ? (
                <>
                  <button
                    className="dropdown-btn d-flex align-items-center gap-1 w-100"
                    onClick={() =>
                      setMobileDropdown(
                        mobileDropdown === link.name ? null : link.name
                      )
                    }
                  >
                    {link.name}
                    <ChevronDown
                      size={16}
                      className={`transition ${
                        mobileDropdown === link.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <ul
                    className={`mobile-dropdown ${
                      mobileDropdown === link.name ? "open" : ""
                    }`}
                  >
                    {dropdownLinks.map((dropdown) => (
                      <li key={dropdown.name}>
                        <Link
                          href={dropdown.path}
                          className="py-1"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {dropdown.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link href={link.path} onClick={() => setMobileMenuOpen(false)}>
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="mobile-buttons">
          <button className="btn login-btn w-100">Login</button>
          <button className="btn trial-btn w-100">Start Free Trial</button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="overlay" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      <style jsx global>{`
        .dropdown-menu {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.95) !important;
          min-width: 200px;
        }

        .mobile-sidebar {
          position: fixed;
          top: 0;
          left: -100%;
          width: 90%;
          max-width: 320px;
          height: 100vh;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          transition: 0.3s ease;
          padding: 2rem 1.5rem;
          z-index: 1050;
        }

        .mobile-sidebar.open {
          left: 0;
        }
        .mobile-nav {
          list-style: none;
          padding: 0;
        }

        .mobile-nav li > * {
          display: block;
          padding: 0.55rem 0;
          color: #333;
          text-decoration: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .mobile-dropdown {
          max-height: 0;
          overflow: hidden;
          transition: 0.3s ease;
          padding-left: 1rem;
        }

        .mobile-dropdown.open {
          max-height: 300px;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(2px);
          z-index: 1040;
        }

        .login-btn {
          background-color: rgb(255, 235, 189) !important;
          border-color: rgb(255, 235, 189) !important;
          color: #333 !important;
        }

        .trial-btn {
          background-color: rgb(224, 248, 222) !important;
          border-color: rgb(224, 248, 222) !important;
          color: #333 !important;
        }

        .mobile-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 20px;
        }
        .dropdown-btn {
          background: none;
          border: none;
        }

        .mobile-buttons .btn {
          padding: 12px;
          font-size: 16px;
          font-weight: 500;
          border-radius: 50px;
        }
      `}</style>
    </>
  );
};

export default Navbar;
