import React from 'react'
import Logo from '../asstes/logo.png';


const Header = () => {
  return (
    <div>
        <div className="shadow-md mb-1 bg-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
            <img className='img' style={{ width: "15%", margin: "-10px" }} src={Logo} alt='Resume Builder' />
                <h1 className="text " style={{ margin: "-16px" }}>CRYPTO DASHBOARD</h1>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Header