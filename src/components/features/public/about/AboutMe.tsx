type Props = {
  bio: string;
  siteDescription: string;
};

function AboutMe({ bio, siteDescription }: Props) {
  return (
    <div className="w-full py-16 flex flex-col gap-6">
      <p className="w-full lg:text-base text-sm font-sub-logo tracking-[0.02em] leading-relaxed">
        {bio}
      </p>
      <p className="w-full lg:text-base text-sm font-sub-logo tracking-[0.02em] leading-relaxed whitespace-pre-line text-gray-600">
        {siteDescription}
      </p>
    </div>
  );
}

export default AboutMe;
