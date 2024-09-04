interface Props {
  title: string;
  amount: string | undefined;
}
export const CardComponent = ({ title, amount }: Props) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white min-h-24">
      <div className="px-6 py-4">
        <div className="text-gray-700 text-sm mb-2">{title}</div>
        <p className="font-bold text-gray-700 text-xl">{amount}</p>
      </div>
    </div>
  );
};
