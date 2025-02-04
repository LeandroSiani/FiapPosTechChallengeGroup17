interface ContentWithTitleProps {
  title: string;
  complementTitle?: string;
  children: React.ReactNode;
  width?: string;
}

export default function ContentWithTitle({
  title,
  complementTitle,
  children,
  width,
}: ContentWithTitleProps) {
  return (
    <div
      className={`${
        width || "w-full"
      } h-[auto] p-6 border border-[#C0C0C0] bg-white rounded-3xl`}
    >
      <p className="text-[#1b1b1b] text-xl font-bold">
        {title}{" "}
        {complementTitle && <span className="text-xs">{complementTitle}</span>}
      </p>
      {children}
    </div>
  );
}
