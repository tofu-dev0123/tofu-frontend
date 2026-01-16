export default function HtmlContent({ html }: { html: string }) {
  return (
    <article
      className="prose prose-neutral max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
