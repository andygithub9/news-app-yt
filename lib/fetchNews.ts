import { gql } from "graphql-request";
import sortNewsByImages from "./sortNewsByImage";

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  // GraphQL query
  // 這裡會去調用 curl/index.graphql 裡的 type Query 裡的 myQuery
  // 所以這邊有的參數 curl/index.graphql 裡的 type Query 裡的 myQuery 也要有相對應的參數
  const query = gql`
    query MyQuery(
      $access_key: String!
      $categories: String!
      $keywords: String
    ) {
      myQuery(
        access_key: $access_key
        categories: $categories
        countries: "gb"
        sort: "published_desc"
        keywords: $keywords
      ) {
        data {
          category
          author
          description
          country
          image
          published_at
          language
          title
          source
          url
        }
        pagination {
          limit
          count
          offset
          total
        }
      }
    }
  `;

  // Fetch function with Next.js 13 caching...
  const res = await fetch(
    "https://guiren.stepzen.net/api/warped-platypus/__graphql",
    {
      method: "POST",
      cache: isDynamic ? "no-cache" : "default",
      next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          access_key: process.env.MEDIASTACK_API_KEY,
          categories: category,
          keywords: keywords,
        },
      }),
    }
  );

  console.log(
    "LOADING NEW DATA FROM API for category >>> ",
    category,
    keywords
  );

  const newsResponse = await res.json();

  // Sort function by images vs not images present
  const news = sortNewsByImages(newsResponse.data.myQuery);

  // return res
  return news;
};

export default fetchNews;

// stepzen import curl "http://api.mediastack.com/v1/news?access_key=YOUR_ACCESS_KEY&countries=us,gb&limit=100&offset=0&sort=published_desc"
