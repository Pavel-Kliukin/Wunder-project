import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { FieldErrors } from "react-hook-form";
import { Button } from "@/ui/button";
import type { Menu } from "@/lib/zod/menu";
import { StatusMessage } from "@/ui/status-message";
import { useTranslation } from "next-i18next";
const SignupSchema = z
  .object({
    news: z.boolean().default(false),
    careers: z.boolean().default(false),
    events: z.boolean().default(false),
    email: z
      .string()
      .email("Please enter a valid email address")
      .nonempty("Email is required"),
    terms: z.boolean().refine((val) => val === true, "Terms must be accepted."),
  })
  .refine((data) => data.news || data.careers || data.events, {
    message: "You must select at least one option",
    path: ["checkboxGroup"],
  });

type TSignupSchema = z.infer<typeof SignupSchema>;

interface FooterProps {
  menu: Menu;
}

type CustomFieldErrors = FieldErrors<TSignupSchema> & {
  checkboxGroup?: {
    message: string;
  };
};

export function Footer({ menu }: FooterProps) {
  const [checkboxGroupError, setCheckboxGroupError] = useState("");
  const { t } = useTranslation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<TSignupSchema>({
    resolver: zodResolver(SignupSchema),
  });

  const customErrors = errors as CustomFieldErrors;

  const onSubmit = async (data: TSignupSchema) => {
    if (!data.news && !data.careers && !data.events) {
      setCheckboxGroupError("You must select at least one option");
      return; // Prevent form submission
    }
    setCheckboxGroupError("");
    console.log(data);
    /*  console.log(onSubmit); */
    // Gather data from the form

    // Make a POST request to API route

    const response = await fetch(`/api/footer-newsletter`, {
      method: "POST",
      body: JSON.stringify({
        webform_id: "footer_newsletter",
        news: data.news,
        careers: data.careers,
        events: data.events,
        email: data.email,
        terms: data.terms,
      }),
      headers: {
        "accept-language": router.locale,
      },
    });
    if (!response.ok) {
      alert("Error!");
    }
  };
  if (isSubmitSuccessful) {
    return (
      <StatusMessage level="success" className="mx-auto w-full max-w-3xl">
        <p className="mb-4">{t("form-thank-you-message")}</p>
        <Button type="button" onClick={() => reset()}>
          {t("form-reset-button")}
        </Button>
      </StatusMessage>
    );
  }
  return (
    <footer className="pt-10 bg-gradient-to-br from-dark to-violet text-white border-t overflow-hidden px-6 flex flex-col md:flex-row justify-between items-start h-[500px]">
      <div className=" text-center flex-1 flex flex-col justify-center mb-6 md:mb-0">
        <p>WANT TO HEAR MORE?</p>
        <p className="font-normal">
          Our international experts are ready to help you.
          <br />
          <span className="underline">Contact us!</span>
        </p>
      </div>

      <div className="flex-1">
        <p className="pb-5 font-bold">Stay up to date with our newsletter</p>
        <p className="pb-5">"*" indicates required fields</p>
        <p className="pb-5">I'M INTERESTED IN</p>
        <div>
          {customErrors.checkboxGroup && (
            <p>{customErrors.checkboxGroup.message}</p>
          )}
        </div>

        <div className="pb-5 flex space-x-4 mt-2">
          <label className="inline-flex items-center">
            <input
              {...register("news")}
              type="checkbox"
              className="form-checkbox text-primary-600"
            />
            <span className="ml-2">Wunder news</span>
          </label>
          <label className="inline-flex items-center">
            <input
              {...register("careers")}
              type="checkbox"
              className="form-checkbox text-primary-600"
            />
            <span className="ml-2">Careers</span>
          </label>
          <label className="inline-flex items-center">
            <input
              {...register("events")}
              type="checkbox"
              className="form-checkbox text-primary-600"
            />
            <span className="ml-2">Events</span>
          </label>
        </div>
        <div className="pb-5 mt-4">
          Email<span className="text-red-500">*</span>
          <input
            {...register("email")}
            type="email"
            className="bg-transparent mt-1 block w-full border-0 border-b-2 border-white focus:ring-0 focus:border-white text-white placeholder-white"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <label className="inline-flex items-center">
          <input
            {...register("terms", {
              required: true,
            })}
            type="checkbox"
            className="form-checkbox text-primary-600"
          />
          <span className="ml-2">
            I approve that Wunder process my personal data according to its
            privacy policy
          </span>
        </label>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <Button variant="quatriary" className="mt-10 text-white">
            Subscribe
          </Button>
        </form>
      </div>
    </footer>
  );
}
