import Link from "next/link";
import styles from "../styles/Login.module.css";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import ApiProvider from "../api/ApiProvider";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/AuthContext";

const forgotPasswordSchema = object({
  email: string().email().label("Email").required(),
});

const ForgotPassword = (props) => {
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
    resolver: yupResolver(forgotPasswordSchema),
  });

  const [succesAlert, setSuccesAlert] = useState({
    success: false,
    msg: "Password Reset Link Send Successfully",
  });

  const resetError = (e) =>
    state.error && setState({ error: false, msg: "", btnEnabled: true });
  const { setAuthState } = useContext(AuthContext);

  const onSubmit = ({ email }) => {
    // if (process.env.NODE_ENV === "development") {
    // console.log({ username, password });
    // }
    ApiProvider.forgotPassword(email)
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
          msg: "Please try again later or Check your Email",
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
      <div>
        <TextInput
          className="w-4/5  bg-grey-color lg:w-3/6"
          type="text"
          placeholder="Email"
          {...register("email", { onChange: resetError })}
          error={errors}
        />
      </div>
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

export default ForgotPassword;
