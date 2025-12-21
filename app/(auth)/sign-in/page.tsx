"use client";

import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      console.log(data);
      // TODO: Add sign-in API call
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h1 className="form-title">Sign In</h1>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="email"
          label="Email"
          type="email"
          placeholder="john.doe@example.com"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          }}
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Enter your password"
          register={register}
          error={errors.password}
          type="password"
          validation={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: "Password must contain both letters and numbers",
            },
          }}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="green-btn w-full mt-2"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </Button>

        <FooterLink
          text="Don't have an account?"
          linkText="Create an Account."
          href="/sign-up"
        />
      </form>
    </>
  );
};

export default SignIn;
