"use client";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./styles.module.css";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("User info:", result.user);
      router.push("/");
    } catch (err) {
      console.error("Google Sign Up error", err.message);
      setError("Error while signing up with Google");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(userCredential.user, {
        displayName: formData.username,
      });
      // await userCredential.user.reload();
      setError("");
      setUsername(formData.username);
      localStorage.setItem("userInfo", formData.username);
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      Swal.fire({
        text: "Registered Successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => router.push("/login"));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.registerWrapper}>
      <div className="bg-white p-8 shadow-lg rounded-2xl max-w-md w-full">
        <h1 className={styles.text}>Sign Up</h1>
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <div className={styles.inputWrappers}>
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={styles.customInput}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className={styles.inputWrappers}>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <br />

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.customInput}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className={styles.inputWrappers}>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={styles.customInput}
              placeholder="Enter your password"
              required
            />
          </div>
          <br />
          <button type="submit" className={styles.customButton}>
            Sign Up
          </button>
        </form>
        <div className={styles.orText}>
          <span className={styles.orSpan}>or</span>
        </div>
        <button
          onClick={handleGoogleSignUp}
          className={styles.googleSignUpButton}
        >
          <span>
            <FaGoogle />
          </span>
          <span className="text-sm font-medium">Sign Up with Google</span>
        </button>
        {error && (
          <p className="text-sm text-red-600 text-center mt-4">{error}</p>
        )}
      </div>
    </div>
  );
}
