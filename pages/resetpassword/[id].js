import Link from "next/link";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import ApiProvider from "../../api/ApiProvider";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { object, string, ref, date } from "yup";

const resetPasswordSchema = object({
  password: string().min(6).max(20).label("Password").required(),
  confirm_password: string()
    .min(6)
    .max(20)
    .label("Confirm Password")
    .oneOf([ref("password")], "Password And Confirm password doesn't match")
    .required(),
});

const ResetPassword = (props) => {
  const router = useRouter();
  const [state, setState] = useState({
    error: false,
    msg: "",
    btnEnabled: true,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const [succesAlert, setSuccesAlert] = useState({
    success: false,
    msg: "Password Reset Successfully",
  });

  const resetError = (e) =>
    state.error && setState({ error: false, msg: "", btnEnabled: true });

  const onSubmit = ({ password }) => {
    // if (process.env.NODE_ENV === "development") {
    // console.log({ username, password });
    // }
    ApiProvider.resetPassword(password, router.query.id)
      .then((res) => {
        if (res.status === 200) {
          setSuccesAlert({ ...succesAlert, success: true });
          //   setTimeout(() => {
          //     router.push("/");
          //   }, 3000);
          setState({
            ...state,
            btnEnabled: false,
          });
        }
      })
      .catch((err) => {
        setState({
          error: true,
          msg: "Please try again later",
        });
      });
  };
  return (
    <form
      className={[
        "container p-2 flex flex-col justify-center text-center mx-auto my-auto",
        props.className,
      ].join(" ")}
      onSubmit={handleSubmit(onSubmit)}
      style={{ height: "460px" }}
    >
      <span className="font-bold text-2xl">
        <span className="text-accent">Forgot Password - Fluid Control</span>
      </span>
      <span className="text-accent font-bold text-xl tracking-wide">
        Forgot Password
      </span>

      <TextInput
        className="w-4/5  bg-grey-color lg:w-3/6"
        placeholder="Password"
        type="password"
        {...register("password", { onChange: resetError })}
        error={errors}
      />
      <TextInput
        className="w-4/5  bg-grey-color lg:w-3/6"
        placeholder="Confirm Password"
        type="password"
        {...register("confirm_password", { onChange: resetError })}
        error={errors}
      />
      {state.error && (
        <span className="mx-auto mb-3 w-2/6 py-2 px-2 bg-red text-white text-center rounded-lg">
          {state.msg}
        </span>
      )}
      <div>
        <div>
          {succesAlert.success && (
            <span className=" bg-green w-4/5 lg:w-2/6 mx-auto my-3 rounded-md text-white p-2 mb-2">
              {succesAlert.msg}
            </span>
          )}
        </div>
        <div>
          {state.btnEnabled && (
            <Button className="mx-6 my-2 " type="submit">
              Send Password Reset Link
            </Button>
          )}

          {/* <Button className="m-6 my-2 hover:scale-105" type="link">
            <Link href="/forgotpassword">Forgot Password</Link>
          </Button> */}
        </div>
        <div className="mt-5">
          <Link href="/" className="text-accent">
            Back To Login{" "}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default ResetPassword;
