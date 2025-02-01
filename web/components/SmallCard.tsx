interface SmallCardProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  message?: boolean;
  fontSmall?: boolean;
}

export default function SmallCard({
  title,
  description,
  icon,
  message,
  fontSmall,
}: SmallCardProps) {
  return (
    <div
      className={`p-5 rounded-3xl shadow-md flex gap-4 items-center h-full ${
        message ? "bg-[#1B1B1B]" : "bg-white"
      }`}
    >
      {message ? (
        <div className="flex justify-between items-center w-full">
          <p className="text-white text-2xl ">Você tem novas mensagens!</p>
          <div className="w-16 h-1 bg-white relative">
            <div className="w-4 h-4 border-t-2 border-r-2 border-white absolute top-1/2 right-0 transform translate-y-[-50%] rotate-45"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-[#EBEBEB] p-2 rounded-full w-16 h-16 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#C0C0C0]">{title}</h3>
            <p
              className={`text-[#1b1b1b] ${
                fontSmall ? "text-2xl" : "text-3xl"
              } font-bold`}
            >
              {description}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
