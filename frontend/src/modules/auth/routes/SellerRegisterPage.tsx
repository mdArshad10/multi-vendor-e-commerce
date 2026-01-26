import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  RiBankLine,
  RiCheckLine,
  RiStoreLine,
  RiUserLine,
} from "@remixicon/react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  BankConnectionStep,
  SellerFormStep,
  SellerRegistrationSchema,
  ShopCreationSchema,
  ShopFormStep,
  type SellerRegistrationData,
  type ShopCreationData,
} from "../components/SellerRegisterComponent";
import { OtpVerificationCard } from "../components/OtpVerificationCard";
import {
  useConnectBank,
  useCreateShop,
  useRegisterSeller,
  useVerifySeller,
} from "../api/auth.queries";

type StepNumber = 1 | 2 | 3 | 4;

function SellerRegisterPage() {
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [innerStep, setInnerStep] = useState<"register" | "verify">("register");
  const [isBankConnected, setIsBankConnected] = useState(false);
  const [sellerId, setSellerId] = useState<string>("");
  const navigate = useNavigate();
  const { mutateAsync: registerSeller, isPending: registerPending } =
    useRegisterSeller();
  const { mutateAsync: verifySeller } = useVerifySeller();
  const { mutateAsync: createShop, isPending: createPending } = useCreateShop();
  const { mutateAsync: connectBank, isPending: connectPending } =
    useConnectBank();

  // Form for step 1 (Seller Registration)
  const sellerForm = useForm<SellerRegistrationData>({
    resolver: yupResolver(SellerRegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      country: "",
      password: "",
      phone_number: "",
    },
  });

  // Form for step 3 (Shop Creation)
  const shopForm = useForm<ShopCreationData>({
    resolver: yupResolver(ShopCreationSchema),
    defaultValues: {
      name: "",
      bio: "",
      description: "",
      address: "",
      website: "",
      category: "",
      opening_hour: "",
    },
  });

  // Step 1: Submit seller registration
  const handleSellerSubmit = async (data: SellerRegistrationData) => {
    console.log("Seller data:", data);

    try {
      // TODO: Call registration API
      const resp = await registerSeller(data);
      if (resp.success) {
        toast.success("OTP sent to your email!");
        setInnerStep("verify");
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Failed to register");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (otp: string) => {
    console.log("OTP:", otp);

    try {
      const resp = await verifySeller({
        email: sellerForm.getValues("email"),
        password: sellerForm.getValues("password"),
        name: sellerForm.getValues("name"),
        phone_number: sellerForm.getValues("phone_number"),
        country: sellerForm.getValues("country"),
        otp,
      });
      if (resp.success) {
        setSellerId(resp.data?.id || "");
        toast.success("user verified successfully!");
        setCurrentStep(2);
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Invalid OTP");
    }
  };

  // Step 2: Resend OTP
  const handleResendOtp = async () => {
    // TODO: Call resend OTP API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("OTP resent!");
  };

  // Step 3: Submit shop creation
  const handleShopSubmit = async (data: ShopCreationData) => {
    console.log("Shop data:", data);

    try {
      const createShopData = {
        ...data,
        sellerId,
      };
      const resp = await createShop(createShopData);
      if (resp.success) {
        toast.success("Shop created successfully!");
        setCurrentStep(3);
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Failed to create shop");
    }
  };

  // Step 4: Connect Stripe
  const handleStripeConnect = async () => {
    try {
      const resp = await connectBank(sellerId);
      if (resp.success) {
        setIsBankConnected(true);
        toast.success("Bank connected successfully!");
        navigate({
          to: "/auth/seller-login" as "/",
        });
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Failed to connect bank");
    }
  };

  const steps = [
    { step: 1, title: "Register", icon: RiUserLine },
    { step: 2, title: "Shop", icon: RiStoreLine },
    { step: 3, title: "Bank", icon: RiBankLine },
  ];

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center px-4 py-8">
      {/* Stepper Navigation */}
      <Stepper
        value={currentStep}
        onValueChange={(v) => setCurrentStep(v as StepNumber)}
        className="w-full max-w-2xl mb-8"
        indicators={{
          completed: <RiCheckLine className="h-4 w-4" />,
        }}
      >
        <StepperNav>
          {steps.map(({ step, title, icon: Icon }, index) => (
            <StepperItem key={step} step={step} completed={currentStep > step}>
              <StepperTrigger className="flex flex-col items-center gap-2">
                <StepperIndicator className="size-10">
                  <Icon className="h-5 w-5" />
                </StepperIndicator>
                <StepperTitle className="hidden sm:block">{title}</StepperTitle>
              </StepperTrigger>
              {index < steps.length - 1 && <StepperSeparator />}
            </StepperItem>
          ))}
        </StepperNav>

        {/* Step Content */}
        <StepperPanel className="mt-8">
          <StepperContent value={1}>
            {innerStep == "register" && (
              <SellerFormStep
                form={sellerForm}
                onSubmit={handleSellerSubmit}
                isPending={registerPending}
              />
            )}
            {innerStep == "verify" && (
              <div className="flex justify-center">
                <OtpVerificationCard
                  email={sellerForm.getValues("email")}
                  type="register"
                  onVerify={handleVerifyOtp}
                  onResendOtp={handleResendOtp}
                  onBack={() => setCurrentStep(1)}
                />
              </div>
            )}
          </StepperContent>

          <StepperContent value={2}>
            <ShopFormStep
              form={shopForm}
              onSubmit={handleShopSubmit}
              isPending={createPending}
              onBack={() => setCurrentStep(1)}
            />
          </StepperContent>

          <StepperContent value={3}>
            <BankConnectionStep
              onConnect={handleStripeConnect}
              onBack={() => setCurrentStep(2)}
              isPending={connectPending}
              isConnected={isBankConnected}
            />
          </StepperContent>
        </StepperPanel>
      </Stepper>
    </div>
  );
}

export default SellerRegisterPage;
