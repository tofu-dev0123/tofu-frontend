export default function HtmlContent({ html }: { html: string }) {
  return (
    <article
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
