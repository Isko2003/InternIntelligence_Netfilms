"use client";
import React, { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import Link from "next/link";
import styles from "./styles.module.css";
import { auth } from "@/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation"; // usePathname ile sayfa kontrolü
import Swal from "sweetalert2";
import { useAuth } from "@/AuthContext";

function Header() {
  const { user, isAuthenticated, isLoggedIn } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const pathname = usePathname(); // Kullanıcının hangi sayfada olduğunu belirler

  useEffect(() => {
    if (user && isLoggedIn && pathname === "/") {
      setDisplayName(user.displayName || "User");
    } else {
      setDisplayName(""); // Eğer ana sayfada değilse, adını gösterme
    }
  }, [user, isLoggedIn, pathname]);

  const handleLogOut = async () => {
    try {
      const result = await Swal.fire({
        title: "Log Out",
        text: "Are you sure you want to log out?",
        icon: "warning",
        confirmButtonText: "YES",
        showCancelButton: true,
        cancelButtonText: "NO",
      });
      if (result.isConfirmed) {
        await signOut(auth);
        window.location.href = "/login";
      }
    } catch (err) {
      console.error(`Error while logging out: ${err}`);
    }
  };

  return (
    <header className={`${styles.header} container fluid`}>
      <div className={styles.headerWrapper}>
        <Link href={"/"} className={styles.logo}>
          <FaPlayCircle /> NETFILMS
        </Link>
        {user && isLoggedIn && pathname === "/" ? (
          <div className={styles.userInfoWrapper}>
            <span className={styles.username}>
              {displayName ? `Hello, ${displayName}` : "Loading..."}
            </span>
            <div>
              <button className={styles.logoutBtn} onClick={handleLogOut}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <nav className={styles.navigationMenu}>
            <Link href={"/login"}>Login</Link>
            <Link href={"/register"}>Register</Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
