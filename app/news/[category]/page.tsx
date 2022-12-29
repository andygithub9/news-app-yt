import { categories } from "../../../constants";
import fetchNews from "../../../lib/fetchNews";
import NewsList from "../../NewsList";

type Props = {
  params: { category: Category };
};

async function NewsCategory({ params: { category } }: Props) {
  const news: NewsResponse = await fetchNews(category);
  return (
    <div>
      <h1 className="headerTitle">{category}</h1>
      <NewsList news={news} />
    </div>
  );
}

export default NewsCategory;

export async function generateStaticParams() {
  return categories.map(category=>({
    category:category
  }))
}

// http://localhost:3000/news/general
// http://localhost:3000/news/business
// http://localhost:3000/news/entertainment
// http://localhost:3000/news/health
// http://localhost:3000/news/science
// http://localhost:3000/news/sports
// http://localhost:3000/news/technology
// ^^^ pre-build these pages...
