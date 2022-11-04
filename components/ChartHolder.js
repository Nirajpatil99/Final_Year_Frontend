const ChartHolder = ({ children, className, style }) => {
  return (
    <div
      className={[
        className,
        "mx-10 my-10 bg-white p-10 shadow-lg text-center rounded-lg",
      ].join(" ")}
      style={style}
    >
      {children}
    </div>
  );
};

export default ChartHolder;
