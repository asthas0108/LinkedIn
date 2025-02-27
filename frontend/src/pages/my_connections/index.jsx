import { AcceptConnection, getMyConnectionRequests } from '@/config/redux/action/authAction';
import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./index.module.css";
import { BASE_URL } from '@/config';
import { useRouter } from 'next/router';

export default function MyConnectionsPage() {

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    dispatch(getMyConnectionRequests({token: localStorage.getItem("token")}));
  }, []);

  useEffect(() => {

    if(authState.connectionRequest.length !== 0) {

      console.log(authState.connectionRequest.length);
      
    }

  }, [authState.connectionRequest]);

  return (
    <UserLayout>

      <DashboardLayout>
        
        <div style={{display: "flex", flexDirection: "column", gap: "1.7rem"}}>
          <h3>My Connections</h3>

          {
            authState.connectionRequest.length == 0 &&
            <h2>NO CONNECTION REQUESTS RECIEVED TILL NOW !!</h2>
          }

          {
            authState.connectionRequest.length !== 0 && authState.connectionRequest.filter((connection) => connection.status_accepted === null).map((user, index) => {
              return (
                <div onClick={() => {
                  router.push(`/view_profile/${user.userId.username}`)
                }} className={styles.userCard} key={index}>

                  <div style={{display: "flex", alignItems: "center", gap: "1.2rem"}}>
                    <div className={styles.profilePicture}>
                      <img src={`${BASE_URL}/${user.userId.profilePicture}`}/>
                    </div>

                    <div className={styles.userInfo}>
                      <h3>{user.userId.name}</h3>
                      <p>{user.userId.username}</p>
                    </div>

                    <button onClick={(e) => {
                      e.stopPropagation()

                      dispatch(AcceptConnection({
                        connectionId: user._id,
                        token: localStorage.getItem("token"),
                        action: "accept"

                      }))
                    }} className={styles.connectionButton}>Accept</button>

                  </div>

                </div>
              )
            })
          }

          <h4>My Network</h4>

          {
            authState.connectionRequest.filter((connection) => connection.status_accepted !== null).map((user, index) => {
              return (
                <div onClick={() => {
                  router.push(`/view_profile/${user.userId.username}`)
                }} className={styles.userCard} key={index}>

                  <div style={{display: "flex", alignItems: "center", gap: "1.2rem"}}>
                    <div className={styles.profilePicture}>
                      <img src={`${BASE_URL}/${user.userId.profilePicture}`}/>
                    </div>

                    <div className={styles.userInfo}>
                      <h3>{user.userId.name}</h3>
                      <p>{user.userId.username}</p>
                    </div>

                    {/* <button onClick={(e) => {
                      e.stopPropagation()

                      dispatch(AcceptConnection({
                        connection_id: user._id,
                        token: localStorage.getItem("token"),
                        action: "accept"

                      }))
                    }} className={styles.connectionButton}>Accept</button> */}

                  </div>

                </div>
              )
            })
          }

        </div>

      </DashboardLayout>

    </UserLayout>
  )
}
