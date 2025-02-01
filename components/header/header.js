"use client";
import React, { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import Link from "next/link";
import styles from "./styles.module.css";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAuth } from "@/AuthContext";
function Header() {
  const { user, isAuthenticated, isLoggedIn } = useAuth();
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
      console.error(`Error while you logging out ${err}`);
    }
  };
  return (
    <header className={`${styles.header} container fluid`}>
      <div className={styles.headerWrapper}>
        <Link href={"/"} className={styles.logo}>
          <FaPlayCircle /> NETFILMS
        </Link>

        {user && user.displayName && isLoggedIn ? (
          <div className={styles.userInfoWrapper}>
            <span className={styles.username}>
              Hello, {user.displayName || "User"}
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
