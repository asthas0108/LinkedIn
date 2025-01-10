import Head from "next/head";
import Image from "next/image";
import {Inter} from "next/font/google";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import UserLayout from "@/layout/UserLayout";

const inter = Inter({subsets: ['latin']});

export default function Home() {

  const router = useRouter();

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.mainContainer}>

          <div className={styles.mainContainer_left}>
            <p>Connect with friends without exaggeration !!</p>
            <p>A true social media platform, with stories no bluffs !</p>

            <div onClick={() => {
              router.push("/login")
            }} className={styles.buttonJoin}>
              <p>Join Now</p>
            </div>
          </div>

          <div className={styles.mainContainer_right}>
            <img src="images/img2.png" alt=""/>
          </div>

        </div>
      </div>
    </UserLayout>
  );
}
