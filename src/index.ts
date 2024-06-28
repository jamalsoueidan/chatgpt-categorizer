import axios from "axios";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getCollections() {
  try {
    const response = await axios.get("http://www.bysisters.dk/api/categories");
    return response.data.data.collections.nodes;
  } catch (error) {
    console.error("Error fetching collections:", error);
    return { error: "Failed to fetch collections" };
  }
}

async function askOpenAI(title: string, description?: string) {
  try {
    const collections = await getCollections();

    // Prepare collections data as context
    const collectionsContext = JSON.stringify(collections, null, 2);

    const content = `
Given the following product title and description, response with the collection titles that this product fits into. The JSON structure should be:

{
  "collections": [
    {
      id: "gid://shopify/Collection/1111",
      title: "example",
    },
  ],
}

Where:
- "collections" includes the existing collections that the product fits into based on the given list of collections.

### Existing Collections:
${collectionsContext}

### Product Details:
Product Title: ${title}
Product Description: ${description}

If you think the product fits multiply collections, it's fine, include them all in the response.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-2024-05-13",
      messages: [
        {
          role: "system",
          content,
        },
      ],
      max_tokens: 300,
    });

    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
  }
}

askOpenAI("dameklip", "");
