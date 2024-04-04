import { ChromaClient } from "chromadb";
import {
  AutoTokenizer,
  type PreTrainedTokenizer,
} from "@sroussey/transformers";

let tokenizer: PreTrainedTokenizer;

export async function split(
  text: string,
  maxTokens: number,
  recurseCount = 0
): Promise<string[]> {
  if (!tokenizer) {
    tokenizer = await AutoTokenizer.from_pretrained("voyageai/voyage");
  }

  const { input_ids } = tokenizer._call(text, {
    return_tensor: false,
  });

  const tokensCount = (() => {
    if (Array.isArray(input_ids)) {
      return input_ids.length;
    } else {
      return input_ids.size;
    }
  })();

  if (tokensCount > maxTokens) {
    const { divisions, joiner } = (() => {
      if (recurseCount > 10) {
        return { divisions: text.split(" "), joiner: " " };
      } else {
        return { divisions: text.split("."), joiner: "." };
      }
    })();

    const half = Math.ceil(divisions.length / 2);
    const firstHalf = divisions.slice(0, half).join(joiner);
    const secondHalf = divisions.slice(half).join(joiner);

    return [
      ...(await split(firstHalf, maxTokens, recurseCount + 1)),
      ...(await split(secondHalf, maxTokens, recurseCount + 1)),
    ];
  } else {
    return [text];
  }
}

export function getChromaClient() {
  return new ChromaClient({
    auth: {
      provider: "token",
      credentials: process.env.CHROMA_TOKEN!,
      providerOptions: { headerType: "AUTHORIZATION" },
    },
    path: process.env.CHROMA_PATH!,
  });
}
