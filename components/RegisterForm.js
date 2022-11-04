import { object, string, ref, date } from "yup";

import TextInput from "./TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Link from "next/link";
import ApiProvider from "../api/ApiProvider";
import { useState } from "react";
import { useRouter } from "next/router";

const registerSchema = object({
  firstname: string().min(2).max(20).label("First Name").required(),
  lastname: string().min(2).max(20).label("Last Name").required(),
  username: string().min(6).max(20).label("Username").required(),
  email: string().email().label("Email").lowercase().required(),
  // recovery_mail: string()
  //   .email()
  //   .notOneOf([ref("email")], "Email and Recovery Email cannot be same")
  //   .lowercase()
  //   .required(),
  password: string().min(6).max(20).label("Password").required(),
  confirm_password: string()
    .min(6)
    .max(20)
    .label("Confirm Password")
    .oneOf([ref("password")], "Password And Confirm password doesn't match")
    .required(),
  dob: date()
    .default(() => new Date(Date.now() - 567648000000))
    // .max(new Date(Date.now() - 567648000000), "Age of user must be 18+")
    .label("Date of Birth")
    .required(),
});

const RegisterForm = () => {
  const router = useRouter();

  const [errorAlert, setErrorAlert] = useState({ error: false, msg: "" });
  const [btnEnabled, setBtnEnabled] = useState({ enabled: true });
  const [succesAlert, setSuccesAlert] = useState({
    success: false,
    msg: "Account Successfully Created, Will redirect to Login in Few Seconds",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const resetError = () => setErrorAlert({ error: false, msg: "" });

  const onSubmit = async (data) => {
    ApiProvider.register({
      ...data,
      dob: `${data.dob.getFullYear()}-${
        data.dob.getMonth() + 1
      }-${data.dob.getDate()}`,
    })
      .then((res) => {
        if (res.status === 200) {
          setSuccesAlert({ ...succesAlert, success: true });
          setBtnEnabled({ enabled: false });
          resetError();
          setTimeout(() => router.push("/"), 3000);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <form
      className="container p-2 flex flex-col justify-center text-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="mb-12 font-semibold text-2xl text-accent">Register</span>
      <div className="flex flex-col flex-wrap justify-center items-center lg:flex-row md:flex-row md:mx-3 md:justify-evenly md:items-stretch">
        <TextInput
          parentclassname="mx-2 w-3/4 md:basis-1/4"
          className="bg-grey-color w-full"
          placeholder="First Name"
          {...register("firstname", { onChange: resetError })}
          error={errors}
        />
        <TextInput
          parentclassname="mx-2 w-3/4 md:basis-1/4"
          className="bg-grey-color w-full"
          placeholder="Last Name"
          {...register("lastname", { onChange: resetError })}
          error={errors}
        />
        <TextInput
          parentclassname="mx-2 w-3/4 md:basis-1/4"
          className="bg-grey-color w-full"
          placeholder="Username"
          {...register("username", { onChange: resetError })}
          error={errors}
        />
      </div>
      <div className="flex flex-col flex-wrap justify-center items-center lg:flex-row md:flex-row md:mx-3 md:justify-evenly md:items-stretch">
        <TextInput
          parentclassname="mx-2 w-3/4 md:basis-1/4"
          className="bg-grey-color w-full"
          placeholder="Email"
          {...register("email", { onChange: resetError })}
          error={errors}
        />
        {/* <TextInput
          parentclassname="mx-2 w-3/4 md:basis-1/4"
          className="bg-grey-color w-full"
          placeholder="Recovery Email"
          {...register("recovery_mail")}
          error={errors}
        /> */}
        <TextInput
          parentclassname="mx-2 w-3/4 md:basis-1/4"
          className="bg-grey-color w-full"
          placeholder="Password"
          type="password"
          {...register("password", { onChange: resetError })}
          error={errors}
        />
        <TextInput
          parentclassname="mx-2 w-3/4 md:basis-1/4"
          className="bg-grey-color w-full"
          placeholder="Confirm Password"
          type="password"
          {...register("confirm_password", { onChange: resetError })}
          error={errors}
        />
      </div>
      <div className="flex flex-col flex-wrap justify-center items-center lg:flex-row md:flex-row md:mx-3 md:justify-evenly md:items-stretch">
        <TextInput
          parentclassname="mx-2 w-3/4 md:basis-1/4"
          className="bg-grey-color w-full"
          placeholder="Date of Birth"
          type="date"
          label="Date of birth"
          {...register("dob", { onChange: resetError })}
          error={errors}
        />
      </div>
      {errorAlert.error && (
        <span className="bg-red w-4/5 lg:w-2/6 mx-auto my-3 rounded-md text-white py-2">
          {errorAlert.msg}
        </span>
      )}

      {succesAlert.success && (
        <span className="bg-green w-4/5 lg:w-2/6 mx-auto my-3 rounded-md text-white p-2">
          {succesAlert.msg}
        </span>
      )}

      <div className="flex flex-row flex-wrap justify-center ">
        {btnEnabled.enabled && (
          <Button className=" my-2 w-36" type="submit">
            Register
          </Button>
        )}
        <Button className="m-6 my-2 hover:scale-105" type="link">
          <Link href="/">Back to Login</Link>
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
