"use client";

import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";
import { ArrowUpRight } from "lucide-react";
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
          placeholder="john.doe@example.com"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",
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
            minLength: 8,
          }}
        />

        <div className="group w-full">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="custom-btn slide-anime w-full mt-2 font-semibold text-white bg-green-600 hover:bg-black hover:text-green-500 hover:ring-1 hover:ring-green-400 text-md"
          >
            <span>{isSubmitting ? "Signing In..." : "Sign In"}</span>

            <span className="arrow-icon">
              <ArrowUpRight size={18} strokeWidth={3} />
            </span>
          </Button>
        </div>

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
