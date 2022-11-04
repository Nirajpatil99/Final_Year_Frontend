import Link from "next/link";
import styles from "../styles/Login.module.css";
import Button from "./Button";
import TextInput from "./TextInput";
import ApiProvider from "../api/ApiProvider";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/AuthContext";

const loginSchema = object({
  username: string().min(5).max(20).label("Username").required(),
  password: string().min(6).max(20).label("Password").required(),
});

const Login = (props) => {
  const router = useRouter();
  const [state, setState] = useState({
    error: false,
    msg: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const resetError = (e) => state.error && setState({ error: false, msg: "" });
  const { setAuthState } = useContext(AuthContext);

  const onSubmit = ({ username, password }) => {
    // if (process.env.NODE_ENV === "development") {
    // console.log({ username, password });
    // }
    ApiProvider.signin(username, password)
      .then((res) => {
        if (res.status === 200) {
          setAuthState({
            username,
            authenticated: true,
          });
          router.push("/dashboard");
        }
      })
      .catch((err) => {
        setState({ error: true, msg: err.msg });
      });

    // ApiProvider.signin(username, password)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     setState({ ...state, error: true, msg: err.msg });
    //   });
  };
  return (
    <form
      className={[
        "container p-2 flex flex-col justify-center text-center mx-auto",
        props.className,
      ].join(" ")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="font-bold text-2xl">
        Welcome to <span className="text-accent">Fluid Control</span>
      </span>
      <span className="text-accent font-bold text-xl tracking-wide">Login</span>
      <div>
        <TextInput
          className="w-4/5  bg-grey-color lg:w-3/6"
          type="text"
          placeholder="Username"
          {...register("username", { onChange: resetError })}
          error={errors}
        />
        <TextInput
          className="w-4/5 bg-grey-color lg:w-3/6"
          type="password"
          placeholder="Password"
          {...register("password", { onChange: resetError })}
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
          <Button className="mx-6 my-2 " type="submit">
            Login
          </Button>

          <Button className="m-6 my-2 hover:scale-105" type="link">
            <Link href="/forgotpassword">Forgot Password</Link>
          </Button>
        </div>
        <div className="mt-5">
          <Link href="/register" className="text-accent">
            New to Fluid Control ? Create new account
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
