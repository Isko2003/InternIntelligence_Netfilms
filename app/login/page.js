"use client";
import { auth } from "@/firebaseConfig";
import styles from "./styles.module.css";
import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formData.email === "" || formData.password === "") {
      setError("Email and password fields should be filled");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setError("");
      Swal.fire({
        text: "Sign In Successfull",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        router.push("/");
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("user info", user);
      router.push("/");
    } catch (err) {
      console.error(`Error while sign in ${err}`);
      setError(err.message);
    }
  };
  return (
    <div className={styles.registerWrapper}>
      <div className="bg-white p-8 shadow-lg rounded-2xl max-w-md w-full">
        <h1 className={styles.text}>Sign In</h1>
        <form onSubmit={handleFormSubmit} autoComplete="off">
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
            Sign In
          </button>
        </form>
        <div className={styles.orText}>
          <span className={styles.orSpan}>or</span>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className={styles.googleSignUpButton}
        >
          <span>
            <FaGoogle />
          </span>
          <span className="text-sm font-medium">Sign In with Google</span>
        </button>
        {error && (
          <p className="text-sm text-red-600 text-center mt-4">{error}</p>
        )}
      </div>
    </div>
  );
}
