const Button = (props) => {
  const { type } = props;

  if (type && type === "link")
    return (
      <button
        {...props}
        className={[
          props.className,
          "py-2 px-4  font-medium tracking-widest rounded-md hover:text-accent",
        ].join(" ")}
      >
        {props.children}
      </button>
    );

  if (type && type === "success")
    return (
      <button
        {...props}
        className={[
          props.className,
          "py-2 px-4  font-medium tracking-widest rounded-md bg-green text-white",
        ].join(" ")}
      >
        {props.children}
      </button>
    );

  if (type && type === "normal")
    return (
      <button
        {...props}
        className={[
          props.className,
          "py-2 px-4 bg-accent text-white font-medium tracking-widest rounded-md",
        ].join(" ")}
        type="submit"
      >
        {props.children}
      </button>
    );

  if (type && type === "chip")
    return (
      <button
        {...props}
        className={[
          props.className,
          "py-2 px-4 bg-accent text-white font-medium tracking-widest rounded-md",
        ].join(" ")}
        type="submit"
      >
        {props.children}
      </button>
    );

  return (
    <button
      {...props}
      className={[
        props.className,
        "py-2 px-4 bg-accent text-white font-medium tracking-widest rounded-md",
      ].join(" ")}
      type="submit"
    >
      {props.children}
    </button>
  );
};

export default Button;
