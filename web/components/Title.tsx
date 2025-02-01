interface TitleProps {
  title: string;
}

export default function Title({ title }: TitleProps) {
  return <h1 className="text-[#1b1b1b] text-4xl font-bold">{title}</h1>;
}
