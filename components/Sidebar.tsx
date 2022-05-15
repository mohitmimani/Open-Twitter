import React from 'react' 
import {GiBirdTwitter} from "react-icons/gi"
const Sidebar = () => {
  return (
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
      <GiBirdTwitter
        className="m-3 h-20 w-20 text-twitter"
      />
    </div>
  )
}

export default Sidebar
