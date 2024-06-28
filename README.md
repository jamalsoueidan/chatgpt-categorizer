# Collection Categorizer with OpenAI

This project uses OpenAI's GPT model to categorize products into existing collections based on their title and description. The collections are fetched from a remote API, and the product details are processed through OpenAI to get the appropriate collection categorization.

## Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. Install the required packages:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory of the project and add your OpenAI API key:

   ```plaintext
   OPENAI_API_KEY=your_openai_api_key
   ```

## Usage

You can use the script by running the following command:

    ```bash
    node index.js
    ```

The `askOpenAI` function is called with a product title and description to categorize the product into the appropriate collections.

### Example

In the example provided in the script, the product title "dameklip" with an empty description is used:

    ```javascript
    askOpenAI("dameklip", "");
    ```

The script will:

1. Fetch the collections from the API at `http://www.bysisters.dk/api/categories`.
2. Send the product title and description along with the fetched collections to OpenAI.
3. Print the collection titles that the product fits into based on OpenAI's response.

## Code Explanation
