import React from 'react';
import styles from "./styles.module.css";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '@/config/redux/reducer/authReducer';

export default function NavbarComponent() {
    const router = useRouter();
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);

    return (
        <header className={styles.container}>
            <nav className={styles.navBar}>
                <div className={styles.brand} onClick={() => router.push("/")}>
                    {/* <img 
                        src="/logo.svg" 
                        alt="ProConnect logo"
                        className={styles.logo}
                    /> */}
                    <span className={styles.title}>ProConnect</span>
                </div>
                <div className={styles.options}>
                    {authState.profileFetched ? (
                        <div className={styles.profileSection}>
                            <span className={styles.greeting}>Hello, {authState.user.userId.name}</span>
                            <button 
                                className={styles.profileBtn}
                                onClick={() => router.push("/profile")}
                            >
                                Profile
                            </button>
                            <button 
                                className={styles.logoutBtn}
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    router.push("/login");
                                    dispatch(reset());
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button 
                            className={styles.joinBtn}
                            onClick={() => router.push("/login")}
                        >
                            Join ProConnect
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
}
