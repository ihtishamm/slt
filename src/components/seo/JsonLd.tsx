/**
 * Emits JSON-LD structured data.
 *
 * The data is passed as an object so it is type-checked and reviewable, rather
 * than living in a raw `<script>` string as it did in the old HTML pages. An
 * array renders as one `<script>` per entry, matching how the legacy pages
 * emitted multiple blocks.
 */
export default function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Structured data is authored by us, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
