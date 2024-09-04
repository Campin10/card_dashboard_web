interface ChipProps {
  approved: boolean;
  label?: string;
  customStyles?: {
    approved?: string;
    declined?: string;
  };
}

const ChipStateComponent: React.FC<ChipProps> = ({
  approved,
  label,
  customStyles = {},
}) => {
  const defaultStyles = {
    approved: "bg-green-100 text-green-600",
    declined: "bg-red-100 text-red-600",
  };

  const chipStyles = approved
    ? customStyles.approved || defaultStyles.approved
    : customStyles.declined || defaultStyles.declined;

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm ${chipStyles}`}
    >
      {label || (approved ? "Approved" : "Declined")}
    </span>
  );
};

export default ChipStateComponent;
