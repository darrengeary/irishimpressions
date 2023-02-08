import React, { useState, useEffect, useRef } from "react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Sling as Hamburger } from "hamburger-react"
import { CSSTransition } from "react-transition-group"
import { useRouter } from "next/router"
import CookiePrompt from "./CookiePrompt"

export default function Navbar({ alwaysVisible = true }) {
  const [prevScrollpos, setPrevScrollpos] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const [activeLink, setActiveLink] = useState(null)
  const menuRef = useRef(null)

  const links = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/boxes",
      label: "All Boxes",
    },
    {
      path: "",
      label: "",
    },
    {
      path: "/product/meanach",
      label: "Bosca Meánach",
    },
    {
      path: "/product/mor",
      label: "Bosca Mór",
    },

    {
      path: "",
      label: "",
    },
    {
      path: "/about",
      label: "Who We Are",
    },

    {
      path: "/contact",
      label: "Contact Us",
    },
  ]

  const logoutClickHandler = () => {
    signOut({ callbackUrl: "/login" })
  }
  useEffect(() => {
    setMenuOpen(false)
    links.forEach((link) => {
      if (router.asPath === link.path) {
        setActiveLink(link.path)
      }
    })
  }, [router])

  useEffect(() => {
    if (!alwaysVisible) {
      const handleScroll = () => {
        const currentScrollPos = window.pageYOffset
        let visible
        if (currentScrollPos < 200) visible = false
        else visible = true
        setPrevScrollpos(currentScrollPos)
        setIsVisible(visible)
      }

      window.addEventListener("scroll", handleScroll)

      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    } else {
      setIsVisible(true)
    }
  }, [prevScrollpos, alwaysVisible])

  const handleClick = (event) => {
    if (!menuRef.current.contains(event.target)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    if (open) {
      window.addEventListener("click", handleClick)
    } else {
      window.removeEventListener("click", handleClick)
    }
    return () => {
      window.removeEventListener("click", handleClick)
    }
  }, [open])

  useEffect(() => {
    setMenuOpen(false)
    links.forEach((link) => {
      if (router.asPath === link.path) {
        setActiveLink(link.path)
      }
    })
  }, [])

  return (
    <header ref={menuRef}>
      <CookiePrompt />
      <div className='nav-container transparent h-header mx-auto flex justify-between items-center px-4'>
        <div className='left-0'>
          <Hamburger
            rounded
            size={20}
            toggled={menuOpen}
            toggle={setMenuOpen}
          />
        </div>
        <div className='d-flex right-0'>
          <div ref={menuRef} className='account4 cart'>
            <div onClick={() => setOpen(!open)} className='cart'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='icon-responsive'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {open && <MenuDropdown className='left-100'></MenuDropdown>}
      <nav
        className={`nav-fixed top-0 left-0 w-full bg-white  ${
          !alwaysVisible
            ? isVisible
              ? "translate-y-0"
              : "translate-y-full pointer-events-none nav-visible"
            : ""
        }`}
      >
        <div className='nav-container h-header mx-auto flex items-center px-4'>
          <div className='left-0'>
            <Hamburger
              rounded
              size={20}
              toggled={menuOpen}
              toggle={setMenuOpen}
            />
          </div>
          <div className='text-center my-auto m-auto'>
            <Link href='/'>
              <img
                layout='responsive'
                className='logo'
                src='/images/logo.png'
              ></img>
            </Link>
          </div>
          <div className='d-flex right-0'>
            <div ref={menuRef} className='eggchip cart'>
              <div onClick={() => setOpen(!open)}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='icon-responsive'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className={`menu-container  ${menuOpen ? "" : "translate-x-full"}`}>
        <div className='buga'>
          <Hamburger
            rounded
            size={20}
            toggled={menuOpen}
            toggle={setMenuOpen}
          />
        </div>
        <ul className='menu-list'>
          {links.map((link, index) => (
            <li
              key={index}
              className={`nav-item ${activeLink === link.path ? "active" : ""}`}
            >
              <Link href={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )

  function MenuDropdown() {
    const [activeMenu, setActiveMenu] = useState("main")
    const [menuHeight, setMenuHeight] = useState(null)
    const dropdownRef = useRef(null)

    useEffect(() => {
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])

    function calcHeight(el) {
      const height = el.offsetHeight
      setMenuHeight(height)
    }

    function DropdownItem(props) {
      return (
        <div
          className='menu-item'
          onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
        >
          <span className='icon-button'>
            <div className='svg'>{props.leftIcon}</div>
          </span>
          {props.children}
          <span className='icon-right'>{props.rightIcon}</span>
        </div>
      )
    }

    return (
      <div className='nav-container'>
        <div
          className='dropdown1'
          style={{ height: menuHeight }}
          ref={dropdownRef}
        >
          <CSSTransition
            in={activeMenu === "main"}
            timeout={500}
            classNames='menu-primary'
            unmountOnExit
            onEnter={calcHeight}
          >
            <div className='menu'>
              {session?.user ? (
                <div>
                  <p className='menuName'>
                    Welcome {/* needed */}
                    {session.user.name.length > 9
                      ? session.user.name.substring(0, 8) + "..."
                      : session.user.name}
                  </p>
                  <Link href='/order-history'>
                    <div>
                      <DropdownItem
                        leftIcon={
                          <svg
                            fill='#000000'
                            viewBox='0 -4.19 122.88 122.88'
                            id='Layer_1'
                            xmlns='http://www.w3.org/2000/svg'
                            xmlnsXlink='http://www.w3.org/1999/xlink'
                            style={{
                              enableBackground: "new 0 0 122.88 114.5",
                            }}
                            xmlSpace='preserve'
                          >
                            <g>
                              <path d='M118.66,9.63c0.67-0.13,1.37,0,1.95,0.35c0.99,0.41,1.69,1.38,1.69,2.52l0.57,79.58c0.05,0.98-0.43,1.95-1.33,2.48 l-32.5,19.39c-0.46,0.35-1.03,0.55-1.65,0.55c-0.15,0-0.3-0.01-0.44-0.04l-84.34-9.38C1.16,105.02,0,103.82,0,102.35V21.42h0 c-0.03-1.08,0.58-2.13,1.64-2.59l42.31-18.6l0,0c0.44-0.2,0.94-0.28,1.46-0.21L118.66,9.63L118.66,9.63z M90.14,33.86v73.06 l27.26-16.26l-0.53-73.65L90.14,33.86L90.14,33.86z M84.65,108.69V34.63l-35.97-4.59L47.5,64.41l-12.63-8.6l-12.63,7.14L24.85,27 L5.49,24.53v75.37L84.65,108.69L84.65,108.69z M78.96,9.94L52.43,25l34.51,4.4l24.19-15.24L78.96,9.94L78.96,9.94z M28.23,21.91 L53.95,6.66l-8.48-1.11L12.74,19.94L28.23,21.91L28.23,21.91z' />
                            </g>
                          </svg>
                        }
                      >
                        My Orders
                      </DropdownItem>
                    </div>
                  </Link>
                  <Link href='/profile'>
                    <div>
                      <DropdownItem
                        leftIcon={
                          <svg
                            viewBox='0 0 24 24'
                            fill='black'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8Z'
                              stroke='#464455'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                            <path
                              d='M14.6824 14H9.31765C8.83513 14 8.59387 14 8.37806 14.0461C7.63116 14.2056 6.9853 14.7661 6.62346 15.569C6.51891 15.8009 6.44262 16.0765 6.29003 16.6278C6.10668 17.2901 6.01501 17.6213 6.00261 17.8884C5.95888 18.8308 6.46818 19.6817 7.22441 19.9297C7.43875 20 7.72864 20 8.30844 20H15.6916C16.2714 20 16.5613 20 16.7756 19.9297C17.5318 19.6817 18.0411 18.8308 17.9974 17.8884C17.985 17.6213 17.8933 17.2901 17.71 16.6278C17.5574 16.0765 17.4811 15.8009 17.3765 15.569C17.0147 14.7661 16.3688 14.2056 15.6219 14.0461C15.4061 14 15.1649 14 14.6824 14Z'
                              stroke='#464455'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        }
                      >
                        User Settings
                      </DropdownItem>
                    </div>
                  </Link>

                  <div onClick={logoutClickHandler}>
                    <DropdownItem
                      leftIcon={
                        <div className='svg'>
                          <svg
                            viewBox='0 0 24 24'
                            fill='black'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M2 6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v2a1 1 0 1 1-2 0V6H4v12h9v-2a1 1 0 1 1 2 0v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zm15.293 2.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L18.586 13H9a1 1 0 1 1 0-2h9.586l-1.293-1.293a1 1 0 0 1 0-1.414z'
                              fill='#0D0D0D'
                            />
                          </svg>
                        </div>
                      }
                    >
                      Log out
                    </DropdownItem>
                  </div>
                </div>
              ) : (
                <div>
                  <div>
                    <Link href='/login'>
                      <div>
                        <DropdownItem
                          leftIcon={
                            <svg
                              viewBox='0 0 24 24'
                              fill='black'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8Z'
                                stroke='#464455'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                              <path
                                d='M14.6824 14H9.31765C8.83513 14 8.59387 14 8.37806 14.0461C7.63116 14.2056 6.9853 14.7661 6.62346 15.569C6.51891 15.8009 6.44262 16.0765 6.29003 16.6278C6.10668 17.2901 6.01501 17.6213 6.00261 17.8884C5.95888 18.8308 6.46818 19.6817 7.22441 19.9297C7.43875 20 7.72864 20 8.30844 20H15.6916C16.2714 20 16.5613 20 16.7756 19.9297C17.5318 19.6817 18.0411 18.8308 17.9974 17.8884C17.985 17.6213 17.8933 17.2901 17.71 16.6278C17.5574 16.0765 17.4811 15.8009 17.3765 15.569C17.0147 14.7661 16.3688 14.2056 15.6219 14.0461C15.4061 14 15.1649 14 14.6824 14Z'
                                stroke='#464455'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>
                          }
                        >
                          Log in
                        </DropdownItem>
                      </div>
                    </Link>{" "}
                    <Link href='/register'>
                      <div>
                        <DropdownItem
                          leftIcon={
                            <svg
                              viewBox='0 0 24 24'
                              fill='black'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8Z'
                                stroke='#464455'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                              <path
                                d='M14.6824 14H9.31765C8.83513 14 8.59387 14 8.37806 14.0461C7.63116 14.2056 6.9853 14.7661 6.62346 15.569C6.51891 15.8009 6.44262 16.0765 6.29003 16.6278C6.10668 17.2901 6.01501 17.6213 6.00261 17.8884C5.95888 18.8308 6.46818 19.6817 7.22441 19.9297C7.43875 20 7.72864 20 8.30844 20H15.6916C16.2714 20 16.5613 20 16.7756 19.9297C17.5318 19.6817 18.0411 18.8308 17.9974 17.8884C17.985 17.6213 17.8933 17.2901 17.71 16.6278C17.5574 16.0765 17.4811 15.8009 17.3765 15.569C17.0147 14.7661 16.3688 14.2056 15.6219 14.0461C15.4061 14 15.1649 14 14.6824 14Z'
                                stroke='#464455'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>
                          }
                        >
                          Register
                        </DropdownItem>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </CSSTransition>
        </div>
      </div>
    )
  }
}
