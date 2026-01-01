"use server";

import { getAuth } from "../better-auth/auth";
import { inngest } from "../inngest/client";
import { headers } from "next/headers";

/* ---------------- SIGN UP ---------------- */

export const signUpWithEmail = async ({
  email,
  password,
  fullName,
  country,
  investmentGoals,
  riskTolerance,
  preferredIndustry,
}: SignUpFormData) => {
  try {
    const auth = await getAuth();

    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: fullName,
      },
    });

    if (response) {
      await inngest.send({
        name: "app/user.created",
        data: {
          email,
          name: fullName,
          country,
          investmentGoals,
          riskTolerance,
          preferredIndustry,
        },
      });
    }

    return { success: true, data: response };
  } catch (e) {
    console.error("Sign up failed", e);
    return { success: false, error: "Sign up failed" };
  }
};

/* ---------------- SIGN IN ---------------- */

export const signInWithEmail = async ({
  email,
  password,
}: SignInFormData) => {
  try {
    const auth = await getAuth();

    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return { success: true, data: response };
  } catch (e) {
    console.error("Sign in failed", e);
    return { success: false, error: "Sign in failed" };
  }
};

/* ---------------- SIGN OUT ---------------- */

export const signOut = async () => {
  try {
    const auth = await getAuth();

    await auth.api.signOut({
      headers: await headers(),
    });

    return { success: true };
  } catch (e) {
    console.error("Sign out failed", e);
    return { success: false, error: "Sign out failed" };
  }
};
