interface KeywordProps {
  keyword: string | null;
}

export default function Keyword({ keyword }: KeywordProps) {
  if (!keyword) return null;

  return (
    <div className="flex items-center w-full mt-4">
      <p className="text-sm text-gray-500"># {keyword}</p>
    </div>
  );
}
