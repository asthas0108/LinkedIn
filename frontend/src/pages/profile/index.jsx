import { getAboutUser } from '@/config/redux/action/authAction';
import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./index.module.css";
import { BASE_URL, clientServer } from '@/config';
import { getAllPosts } from '@/config/redux/action/postAction';
import { resetPostId } from '@/config/redux/reducer/postReducer';

export default function ProfilePage() {

    const dispatch = useDispatch();

    const authState = useSelector((state) => state.auth);
    const postReducer = useSelector((state) => state.postReducer);

    const [userProfile, setUserProfile] = useState({});

    const [userPosts, setUserPosts] = useState({});

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [inputData, setInputData] = useState({company: "", position: "", years: ""});

    const handleWorkInputChange = (e) => {
      const {name, value} = e.target;
      setInputData({...inputData, [name]: value})
    }

    useEffect(() => {
        dispatch(getAboutUser({token: localStorage.getItem("token")}));
        dispatch(getAllPosts())
    }, []);


    useEffect(() => {

        if(authState.user !== undefined) {
            setUserProfile(authState.user)
            let post = postReducer.posts.filter((post) => {
  
                return post.userId.username === authState.user.username
        
            })
            
    
            setUserPosts(post);
        }
    }, [authState.user, postReducer.posts]);

    const updateProfilePicture = async (file) => {
      const formData = new FormData();

      formData.append("profile_picture", file);
      formData.append("token", localStorage.getItem("token"));

      const response = await clientServer.post("/update_profile_picture", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch(getAboutUser({token: localStorage.getItem("token")}))
    }


    const updateProfileData = async () => {

      const request = await clientServer.post("/user_update", {
        token: localStorage.getItem("token"),
        name: userProfile.userId.name,
      });

      const response = await clientServer.post("/update_profile_data", {

        token: localStorage.getItem("token"),
        bio: userProfile.bio,
        currentPost: userProfile.currentPost,
        pastWork: userProfile.pastWork,
        education: userProfile.education

      });

      dispatch(getAboutUser({token: localStorage.getItem("token")}));
    }

  return (
    <UserLayout>
        <DashboardLayout>
        {authState.user && userProfile.userId && <div className={styles.container}>
            <div className={styles.backDropContainer}>

              <label htmlFor='uploadProfilePicture' className={styles.backDrop__overlay}>
                <p>EDIT</p>
              </label>

              <input onChange={(e) => {
                  updateProfilePicture(e.target.files[0])
              }} hidden type='file' id='uploadProfilePicture'/>

              <img className={styles.backDrop} src={`${BASE_URL}/uploads/${userProfile.userId.profilePicture}`}/>
            </div>

            <div className={styles.profileContainer_details}>

              <div style={{display: "flex", flexDirection: "column", gap: "1.7rem"}}>

                {/* bio */}

                <div style={{}}>

                  <div style={{display: "flex", width: "fit-content", alignItems: "center", gap: "1.2rem"}}>
                    
                    <input className={styles.nameEdit} type='text' value={userProfile.userId.name} onChange={(e) => {
                      setUserProfile({...userProfile, userId: {...userProfile.userId, name: e.target.value}})
                    }}/>

                    <p style={{color: "gray"}}>@{userProfile.userId.username}</p>
                  </div>

                  <div>
                    <h3 style={{paddingBottom: "1.2rem"}}>About</h3>
                    <textarea
                      className={styles.textarea_about} 
                      value={userProfile.bio} 
                      onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                      rows={Math.max(3, Math.ceil(userProfile.bio.length / 80))}
                      style={{
                        width: "100%",
                        minHeight: "100px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        backgroundColor: "#f9f9f9",
                        fontSize: "16px"
                      }}
                      placeholder="Write something about yourself..."
                    ></textarea>
                  </div>


                </div>

                {/* work history */}

                <div className={styles.workHistory}>

              <h3>Work History</h3>

              <div className={styles.workHistoryContainer}>

                {
                  userProfile.pastWork.map((work, index) => {
                    return (
                      <div key={index} className={styles.workHistoryCard}>

                        <p style={{fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.8rem"}}>
                          {work.company} - {work.position}
                        </p>
                        <p>{work.years}</p>

                      </div>
                    )
                  })
                }

                <button className={styles.addWorkButton} onClick={() => {
                  setIsModalOpen(true)
                }}>Add Work</button>

              </div>

                </div>

                {/* recent activity */}

                <div style={{}}>

                  <h3>Recent Activity</h3>

                  <div className={styles.cardContainer}>
                  {
                    userPosts.map((post) => {
                      // console.log(post);
                      
                      return (
                        <div key={post._id} className={styles.postCard}>

                          <div className={styles.card}>

                            <div className={styles.card_profileContainer}>
                              {
                                post.media !== "" ? <img src={`${BASE_URL}/uploads/${post.media}`}/> : <div style={{width: "3.4rem", height:"3.4rem"}}></div>
                              }
                            </div>

                            <p>{post.body}</p>

                          </div>

                        </div>
                      )
                    })
                  }
                  </div>

                </div>

              </div>

            </div>

            

            {
              userProfile != authState.user && 
              <div onClick={() => {
                updateProfileData()
              }} className={styles.connectionButton}>
                Update Profile
              </div>
            }

          </div>}

            {
              isModalOpen &&
              <div onClick={() => {
                setIsModalOpen(false)
              }} className={styles.commentsContainer}>

                <div onClick={(e) => e.stopPropagation()} className={styles.allCommentsContainer}>

                  <input
                    onChange={handleWorkInputChange}
                    name='company'
                    className={styles.inputField}
                    type="text"
                    placeholder="Enter name of the company"
                  />

                  <input
                    onChange={handleWorkInputChange}
                    name='position'
                    className={styles.inputField}
                    type="text"
                    placeholder="Enter the position you have been working on"
                  />

                  <input
                    onChange={handleWorkInputChange}
                    name='years'
                    className={styles.inputField}
                    type="number"
                    placeholder="Enter the number of years you have worked in the company"
                  />

                  <div onClick={() => {
                    setUserProfile({...userProfile, pastWork: [...userProfile.pastWork, inputData]})
                    setIsModalOpen(false)
                  }} className={styles.connectionButton}>Add Work</div>

                </div>

              </div>
            }
 
        </DashboardLayout>
    </UserLayout>
  )
}
