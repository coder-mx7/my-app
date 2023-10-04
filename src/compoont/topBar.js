import React from 'react';
import { Link } from 'react-router-dom';
const TopBar = () => {
   return (
      <div className='contianer'>
         <div>
            <nav>
               <Link to='/'>
                  Store
               </Link>
               <Link to='/'>go to web store</Link>
            </nav>
         </div>
      </div>
   );
}

export default TopBar;
