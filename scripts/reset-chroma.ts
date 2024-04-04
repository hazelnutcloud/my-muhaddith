import { fileURLToPath } from "node:url";
import { getChromaClient } from "@/utils/chroma";
import readline from "node:readline";

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "Are you sure you want to reset the Chroma DB? (y/N): ",
    async (answer) => {
      if (answer.toLowerCase() === "y") {
        const chromaClient = getChromaClient();

        await chromaClient.reset();

        console.log("Chroma DB reset");
      }

      rl.close();
    }
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
