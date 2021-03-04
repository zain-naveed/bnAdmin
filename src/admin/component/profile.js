import React,{useState,useEffect} from 'react';
import {getCookie} from '../../cookies/cookies';
import Card from './profile/card';
import ProfileList from './profile/list';
import ProfileCard from './profile/ProfileCard'
import {profileTokenService} from '../../services/superAdminService/profileTokenService';
import {useDispatch} from 'react-redux';
function Profile(){
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(
      profileTokenService()
    )
  })
    // const [profile,setProfile] = useState("")
    // if(Object.keys(getCookie('profile')) && profile === ""){
    //     setProfile(getCookie('profile'))
    // }
    // console.log(profile)
    return <>
    <div className="main-content ">
   
  {/* <ProfileList /> */}
  
  <div className="container mt-4">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <ProfileCard />
              <ProfileList />
            </div>
            <div className="col-md-8">
              <Card />
            </div>
          </div>
        </div>
      </div>
				{/* <div className="container">
                    <div className="row my-4 text-center">
                        <div className="col-6 d-block">
                            <img src={profile.profileImageURL} className="img-fluid mx-auto d-block" style={{height:"20rem",width:"20rem",borderRadius:"100%",boxShadow:"2px 2px 5px 5px white"}}  />
                        </div>
                        <div className="col-6 text-center py-4">
                        <table className="table table-dark ">
                            <tr>
                                <td>First Name</td>
                                <td>{profile.firstName}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{profile.lastName}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{profile.email}</td>
                            </tr>
                            <tr>
                                <td>Role</td>
                                <td>{profile.role}</td>
                            </tr>
                        </table>
                        </div>
                    </div>

                </div> */}
			</div>
    </>
}
export default Profile;