import Link from 'next/link';

function ContactMain() {
  const contact = [
    {
      name: 'GitHub',
      url: 'https://github.com/tofu-dev0123',
    },
    {
      name: 'X',
      url: 'https://x.com/tofu_dev_log',
    },
  ];
  return (
    <div className="w-full flex flex-col items-center justify-center lg:mb-[40vh]">
      <h1 className="text-2xl lg:text-4xl font-bold text-center font-sub-logo">
        Contact
      </h1>
      <div className="flex flex-col items-center justify-center gap-10 my-20">
        {contact.map((item) => (
          <p
            key={item.name}
            className="lg:text-lg font-sub-logo tracking-[0.02em] lg:opacity-70 hover:opacity-100 transition-opacity duration-300"
          >
            <Link href={item.url} target="_blank" rel="noopener noreferrer">
              {item.name}
            </Link>
          </p>
        ))}
      </div>
      <p className="text-[0.6rem] lg:text-xs font-sub-logo tracking-[0.02em]">
        Feel free to reach out.
      </p>
    </div>
  );
}

export default ContactMain;
