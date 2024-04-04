import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

export const hadiths = {
  name: "hadiths",
  embeddingFunction: {
    async generate(texts: string[]) {
      const batchesNo = Math.ceil(texts.length / 128);
      const batches = Array.from({ length: batchesNo }, (_, i) =>
        texts.slice(i * 128, (i + 1) * 128)
      );

      const embeddings: number[][] = [];

      for (const batch of batches) {
        const res = await fetch("https://api.voyageai.com/v1/embeddings", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.VOYAGE_API_KEY!}`,
          },
          body: JSON.stringify({
            input: batch,
            model: "voyage-2",
          }),
          method: "POST",
        });

        if (!res.ok) {
          throw new Error(
            `Failed to generate embeddings: ${res.status} ${
              res.statusText
            }, ${await res.text()}`
          );
        }

        const batchEmbeddings = Value.Decode(
          voyageResponseSchema,
          Value.Convert(voyageResponseSchema, await res.json())
        ).data.map(({ embedding }) => embedding);

        embeddings.push(...batchEmbeddings);
      }

      return embeddings;
    },
  },
};

const voyageResponseSchema = Type.Object({
  object: Type.Literal("list"),
  data: Type.Array(
    Type.Object({
      object: Type.Literal("embedding"),
      embedding: Type.Array(Type.Number()),
    })
  ),
});
