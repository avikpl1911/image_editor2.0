import React from 'react'
import "./navbar.css"
import "@fontsource/parisienne";
import Svglogo from '../../assets/svglogo';

function Navbar() {
  return (
    <div
    className='navbarContainer'
    >
      <div className="navbarTitle">
        <div className="navbarlogo">
          <Svglogo/>
        </div>
        <div className="navbarname">limedit</div>
        
      </div>
    </div>
  )
}

export default Navbar