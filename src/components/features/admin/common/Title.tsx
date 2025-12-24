interface TitleProps {
  title: string;
}

function Title({ title }: TitleProps) {
  return (
    <div className="h-15 w-full flex items-center p-4">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}

export default Title;
