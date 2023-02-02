import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import SimpleBar from "simplebar-react";
import MetisMenu from "metismenujs";

import logoWhite from "../../assets/images/ui-white.png";

function Sidebar(){
    const ref = useRef();
    const location = useLocation();
    
    useEffect(() => {
        const pathName = location.pathname;
    
        const initMenu = () => {
          new MetisMenu("#side-menu");
          let matchingMenuItem = null;
          const ul = document.getElementById("side-menu");
          const items = ul.getElementsByTagName("a");
          for (let i = 0; i < items.length; ++i) {
            if (pathName === items[i].pathname) {
              matchingMenuItem = items[i];
              break;
            }
          }
          if (matchingMenuItem) {
            activateParentDropdown(matchingMenuItem);
          }
        };
        initMenu();
    }, [location.pathname]);

    useEffect(() => {
        ref.current.recalculate();
    });

    function scrollElement(item) {
        if (item) {
          const currentPosition = item.offsetTop;
          if (currentPosition > window.innerHeight) {
            ref.current.getScrollElement().scrollTop = currentPosition - 300;
          }
        }
    }

    function activateParentDropdown(item) {
        item.classList.add("active");
        const parent = item.parentElement;
        const parent2El = parent.childNodes[1];
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.add("mm-show");
        }
    
        if (parent) {
          parent.classList.add("mm-active");
          const parent2 = parent.parentElement;
    
          if (parent2) {
            parent2.classList.add("mm-show"); // ul tag
    
            const parent3 = parent2.parentElement; // li tag
    
            if (parent3) {
              parent3.classList.add("mm-active"); // li
              parent3.childNodes[0].classList.add("mm-active"); //a
              const parent4 = parent3.parentElement; // ul
              if (parent4) {
                parent4.classList.add("mm-show"); // ul
                const parent5 = parent4.parentElement;
                if (parent5) {
                  parent5.classList.add("mm-show"); // li
                  parent5.childNodes[0].classList.add("mm-active"); // a tag
                }
              }
            }
          }
          scrollElement(item);
          return false;
        }
        scrollElement(item);
        return false;
    }

    return (
        <>
          <div className="vertical-menu">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoWhite} alt="" height="30" className="rounded-circle" />
                </span>
                <span className="logo-lg">
                  <img src={logoWhite} alt="" height="50" className="rounded-circle" />
                </span>
                <div className="d-none d-md-block title-logo">
                  <h6 className="text-white">UNIVERSIDAD INTERCONTINENTAL</h6>
                </div>
              </Link>
            </div>
            <div data-simplebar className="h-100 mt-4 bar-menu">
              <SimpleBar className="h-100" ref={ref}>
                  <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title">Menu </li>
                        <li> 
                          <Link to="/colegiatura" className="">
                              <i className="bx bx-calendar"></i>
                              <span>Colegiatura</span>
                          </Link> 
                        </li>
                        <li>
                          <Link to="/datos-facturacion" className="">
                              <i className="bx bx-shield-quarter"></i>
                              <span>Datos de facturación</span>
                          </Link>              
                        </li>
                        <li>
                          <Link to="/ayuda" className="">
                              <i className="bx bx-help-circle"></i>
                              <span>Ayuda</span>
                          </Link>              
                        </li>
                    </ul>
                  </div>
              </SimpleBar>
            </div>
            <div className="sidebar-background"></div>
          </div>
        </>
      );
}
export default Sidebar