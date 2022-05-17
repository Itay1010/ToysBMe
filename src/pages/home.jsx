import React from "react";
import { UserLogin } from "../cmps/home-login";

export function Home() {
    return (
      <>
        <main>
          <h2>Welcome to the best toy store in town!</h2>
          <p>Find the toy that makes you think "I can afford this, I don't need money".</p>
          <UserLogin />
        </main>
      </>
    );
  }