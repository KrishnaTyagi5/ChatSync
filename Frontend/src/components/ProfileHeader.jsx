import {React,useState,useRef} from 'react'
import {LogOut} from 'lucide-react'
import useAuthStore from '../store/useAuthStore'

{/*This is for profile section on top-left*/}
function ProfileHeader() {

  {/*Taking variables from authStore to use*/}
  const {logout,authenticatedUser,updateProfile} = useAuthStore();

  {/*To tell the input on selection of which element it should open */}
  const fileRef = useRef(null)

  {/*This is converting the file to form and then sending to backend by updateProfile() */}
  async function ProfileHandler(e){
      const actualFile = e.target.files[0]
      const convertingToForm = new FormData()
      convertingToForm.append("profilePic",actualFile)
      await updateProfile(convertingToForm)
  }

 {/*This is simply for logout */}
  function logOut(){
    logout()
  }


return (
  <div className="p-6 border-b border-slate-700/50">
    <div className="flex items-center justify-between">
      <div className='flex items-center gap-3'>


      {/* Avatar */}
      <div className="avatar online">

        {/*When i click this button internally it will click the input using onClick()  */}
        <button className='size-14 rounded-full overflow-hidden relative group'
          onClick={() => fileRef.current.click()}>

        {/*Here this image is simply showing the profilePic in button */}
        <img
          src={authenticatedUser.profilePic || "/Avatar.png"}
          alt="Profile"
          className='size-full object-cover '
        />
        </button>

        {/*This input is hidden but its reference is in the fileRef for click */}
        <input
          type="file"
          accept='image/*'
          ref={fileRef}
          className="hidden"
          onChange={ProfileHandler}
        />
      </div>



      {/*This is  User Information */}
      <div >
        <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">{authenticatedUser.userName}</h3>
        <span className='text-slate-400 text-xs'>Online</span>
      </div>
    </div>


    <div className='flex gap-4 items-center'>
      {/* For Logout */}
      <button className="text-slate-400 hover:text-slate-200 transition-color" onClick={logOut}>
        <LogOut className='size-5'/>
      </button>
    </div>
  </div>
</div>
);
}

export default ProfileHeader