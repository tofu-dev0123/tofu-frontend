export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="lg:w-6xl w-full flex flex-col mx-auto mb-20">
      <h1 className="text-2xl font-bold">{slug}</h1>
    </div>
  );
}
