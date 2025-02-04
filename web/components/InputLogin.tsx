interface InputLoginProps {
  label: string;
  id: string;
  [key: string]: any;
  icon?: React.ReactNode;
}

export default function InputLogin({
  label,
  id,
  icon,
  ...rest
}: InputLoginProps) {
  return (
    <div className="relative border border-gray-300 rounded-md gap-2 shadow-sm bg-white flex items-center py-5 px-6 rounded-s-full rounded-e-full">
      {icon && icon}

      <input id={id} {...rest} className="outline-transparent w-full" />
    </div>
  );
}
