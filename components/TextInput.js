import { forwardRef } from "react";

const TextInput = forwardRef((props, ref) => {
  // console.log(props);
  return (
    <div className={[props.parentclassname, "mt-3 mb-6"].join(" ")}>
      {props.placeholder && (
        <>
          <div className="my-1 text-center">
            <label className="pl-2">{props.placeholder}</label>
          </div>
        </>
      )}
      <input
        {...props}
        className={[
          props.className,
          "rounded-lg outline-0 px-2 h-10 w-full text-center",
        ].join(" ")}
        ref={ref}
      />
      {props.error && props.error[props.name] && (
        <p className="mt-1 text-red font-medium">
          {props.error[props.name].message}
        </p>
      )}
    </div>
  );
});

export default TextInput;
