/**
 * SellerRegisterComponent.tsx - Multi-Step Seller Registration
 *
 * 4-step registration flow:
 * 1. Seller Registration (name, email, country, password, phone)
 * 2. OTP Verification
 * 3. Create Shop
 * 4. Bank Connection (Stripe)
 */

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "sonner";
import { RiBankLine, RiCheckLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  InputControl,
  SelectControl,
  TextareaControl,
} from "@/components/common/control";

// ========== Validation Schemas ==========

export const SellerRegistrationSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  country: yup.string().required("Country is required"),
  password: yup
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters")
    .required("Password is required"),
  phone_number: yup
    .string()
    .trim()
    .matches(/^[0-9+\-\s()]+$/, "Invalid phone number")
    .required("Phone number is required"),
});

export const ShopCreationSchema = yup.object({
  name: yup.string().trim().required("Shop name is required"),
  bio: yup
    .string()
    .trim()
    .max(200, "Bio must be less than 200 characters")
    .default(""),
  description: yup.string().trim().required("Description is required"),
  address: yup.string().trim().required("Address is required"),
  website: yup.string().url("Invalid URL").nullable().default(""),
  category: yup.string().required("Category is required"),
  opening_hour: yup.string().required("Opening hour is required"),
});

export type SellerRegistrationData = yup.InferType<
  typeof SellerRegistrationSchema
>;
export type ShopCreationData = yup.InferType<typeof ShopCreationSchema>;

// ========== Static Data ==========

export const COUNTRIES = [
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
  { label: "Canada", value: "ca" },
  { label: "Australia", value: "au" },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr" },
  { label: "India", value: "in" },
  { label: "Japan", value: "jp" },
  { label: "China", value: "cn" },
  { label: "Brazil", value: "br" },
];

export const SHOP_CATEGORIES = [
  { label: "Electronics", value: "electronics" },
  { label: "Fashion & Clothing", value: "fashion" },
  { label: "Home & Garden", value: "home" },
  { label: "Sports & Outdoors", value: "sports" },
  { label: "Beauty & Health", value: "beauty" },
  { label: "Books & Media", value: "books" },
  { label: "Toys & Games", value: "toys" },
  { label: "Food & Beverages", value: "food" },
  { label: "Automotive", value: "automotive" },
  { label: "Art & Crafts", value: "art" },
];

// ========== Step Components ==========

export interface SellerFormStepProps {
  form: ReturnType<typeof useForm<SellerRegistrationData>>;
  onSubmit: (data: SellerRegistrationData) => void;
  isPending: boolean;
}

export function SellerFormStep({
  form,
  onSubmit,
  isPending,
}: SellerFormStepProps) {
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">
          Create Your Seller Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <InputControl
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="Enter your full name"
            required
          />

          <InputControl
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="name@example.com"
            required
          />

          <SelectControl
            control={form.control}
            name="country"
            label="Country"
            placeholder="Select your country"
            data={COUNTRIES}
            required
          />

          <InputControl
            control={form.control}
            name="phone_number"
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 000-0000"
            required
          />

          <InputControl
            control={form.control}
            name="password"
            label="Password"
            type="password"
            placeholder="Create a strong password"
            required
          />

          <Button
            type="submit"
            className="w-full h-11 mt-4"
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Sending OTP...
              </span>
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export interface ShopFormStepProps {
  form: ReturnType<typeof useForm<ShopCreationData>>;
  onSubmit: (data: ShopCreationData) => void;
  isPending: boolean;
  onBack: () => void;
}

export function ShopFormStep({
  form,
  onSubmit,
  isPending,
  onBack,
}: ShopFormStepProps) {
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Create Your Shop</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <InputControl
            control={form.control}
            name="name"
            label="Shop Name"
            placeholder="Enter your shop name"
            required
          />

          <TextareaControl
            control={form.control}
            name="bio"
            label="Bio"
            placeholder="Short description about your shop (optional)"
            rows={2}
            maxLength={200}
          />

          <TextareaControl
            control={form.control}
            name="description"
            label="Description"
            placeholder="Describe your shop and what you sell"
            rows={3}
            required
          />

          <InputControl
            control={form.control}
            name="address"
            label="Business Address"
            placeholder="Enter your business address"
            required
          />

          <InputControl
            control={form.control}
            name="website"
            label="Website"
            type="url"
            placeholder="https://yourwebsite.com (optional)"
          />

          <InputControl
            control={form.control}
            name="opening_hour"
            label="Opening Hours"
            type="text"
            placeholder="Enter opening hours"
          />

          <SelectControl
            control={form.control}
            name="category"
            label="Category"
            placeholder="Select shop category"
            data={SHOP_CATEGORIES}
            required
          />

          <div className="flex gap-3 mt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-11"
              onClick={onBack}
            >
              ← Back
            </Button>
            <Button type="submit" className="flex-1 h-11" disabled={isPending}>
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Creating...
                </span>
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export interface BankConnectionStepProps {
  onConnect: () => void;
  onBack: () => void;
  isPending: boolean;
  isConnected: boolean;
}

export function BankConnectionStep({
  onConnect,
  onBack,
  isPending,
  isConnected,
}: BankConnectionStepProps) {
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <RiBankLine className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-xl font-bold">Connect Your Bank</CardTitle>
        <p className="text-muted-foreground text-sm">
          Connect your bank account via Stripe to receive payments from your
          sales.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {isConnected ? (
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <RiCheckLine className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-green-600 font-medium">
              Bank Connected Successfully!
            </p>
          </div>
        ) : (
          <Button
            onClick={onConnect}
            className="w-full h-12 bg-[#635BFF] hover:bg-[#5851db] text-white"
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Connecting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                </svg>
                Connect with Stripe
              </span>
            )}
          </Button>
        )}

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1 h-11"
            onClick={onBack}
          >
            ← Back
          </Button>
          {isConnected && (
            <Button
              className="flex-1 h-11"
              onClick={() => toast.success("Registration Complete!")}
            >
              Complete Registration
            </Button>
          )}
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Your payment information is secure and handled by Stripe.
        </p>
      </CardContent>
    </Card>
  );
}
