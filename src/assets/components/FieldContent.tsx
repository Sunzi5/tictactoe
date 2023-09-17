interface Props {
  children: string;
}

const FieldContent = ({ children }: Props) => {
  return (
    <>
      {children === "X" && <i className="fa-solid fa-x color-red"></i>}
      {children === "O" && <i className="fa-solid fa-o"></i>}
    </>
  );
};

export default FieldContent;
