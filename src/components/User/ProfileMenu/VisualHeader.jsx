import React from "react";

const VisualHeader = ({userImage, userUsername, PlaceholderUser}) => {
  return (
    <div className="flex items-center space-x-3 cursor-pointer z-auto">
      <div className="font-semibold text-white uppercase letter hidden sm:block">
        {userUsername}
      </div>
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-900">
        {userImage === null ? (
          <img
            src={PlaceholderUser}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={userImage}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default VisualHeader;
