export const clearNoArgs = () => {
  return (
    <>
      "The clear command doesn't take any arguments. Did you mean{" "}
      <span
        style={{
          backgroundColor: "rgba(0, 0, 0)",
          borderRadius: "5px",
          paddingInline: "5px",
        }}
      >
        clear
      </span>
      ?"
    </>
  );
};
