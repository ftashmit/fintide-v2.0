"use client";

import CountrySelectField from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { Button } from "@/components/ui/button";
import { signUpWithEmail } from "@/lib/actions/auth.actions";
import {
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from "@/lib/constants";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "US",
      investmentGoals: "",
      riskTolerance: "",
      preferredIndustry: "",
    },
    mode: "onBlur",
  });
  const onSubmit = async (data: SignUpFormData) => {
    try {
      const result = await signUpWithEmail(data);
      if (result.success) router.push("/dashboard");
    } catch (e) {
      console.error(e);
      toast.error("Sign up failed. Please try again.", {
        description:
          e instanceof Error ? e.message : "Failed to create an account.",
      });
    }
  };
  return (
    <>
      <h1 className="form-title"> Sign Up & Personalize</h1>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="fullName"
          label="Full Name"
          placeholder="John Doe"
          register={register}
          error={errors.fullName}
          validation={{ required: "Full Name is required", minLength: 2 }}
        />
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
            required:
              "8-digit Password is required with a combination of alphabets and numbers",
            minLength: 8,
          }}
        />
        <CountrySelectField
          name="country"
          label="Country"
          placeholder="Select your country"
          control={control}
          error={errors.country}
          required
        />
        <SelectField
          name="investmentGoals"
          label="Investment Goals"
          placeholder="Select your investment goals"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
        />
        <SelectField
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="Select your risk level"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />
        <SelectField
          name="preferredIndustry"
          label="Preferred Industry"
          placeholder="Select your preferred industry "
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          required
        />{" "}
        <div className="group w-full">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="custom-btn slide-anime w-full mt-2 font-semibold text-white bg-green-500 hover:bg-black hover:text-green-500 hover:ring-1 hover:ring-green-400 text-md"
          >
            <span>
              {isSubmitting
                ? "Creating Account..."
                : "Start Your Investment Journey"}
            </span>

            <span className="arrow-icon font-bold">
              <ArrowUpRight size={18} strokeWidth={3} />
            </span>
          </Button>
        </div>
        <FooterLink
          text="Already have an account?"
          linkText="Sign In"
          href="/sign-in"
        />
      </form>
    </>
  );
};

export default SignUp;
