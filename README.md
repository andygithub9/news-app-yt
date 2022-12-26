1. Install graphql-request graphql
   `yarn add graphql-request graphql`
   https://www.npmjs.com/package/graphql-request
2. Init StepZen
   1. https://stepzen.com/getting-started
   2. https://stepzen.com/docs/connecting-frontends/connecting-to-stepzen  
      `stepzen init`
   3. https://stepzen.com/getting-started?details=rest
      `stepzen import curl "http://api.mediastack.com/v1/news?access_key=YOUR_ACCESS_KEY&countries=us,gb&limit=100&offset=0&sort=published_desc"`
   4. https://stepzen.com/docs/using-graphql/graphql-mutation-basics  
      `stepzen start`
   5. https://stepzen.com/docs/access-control  
      打 stepzen api 的時候需要帶 headers 需要帶 Authorization: Apikey YOUR_ADMIN_KEY , 如下:
      ```js
      headers: {
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`;
      }
      ```
      參考: lib/fetchNews.ts
   6. 發送請求到 stepzen , 再通過 stepzen 發送請求到 mediastack , 參考: lib/fetchNews.ts

---

如果執行 graphql 出現下列錯誤訊息 Unknown argument "categories" on field "myQuery" of type "Query

```bash
{
  data: null,
  errors: [
    {
      message: 'Unknown argument "categories" on field "myQuery" of type "Query",
    }
  ]
}
```

請檢查 curl/index.graphql 裡的 type Query 裡的 myQuery(
這裡可能缺少了 categories 欄位, 請加上如下的 key value
categories: String
)  
可以參考 lib/fetchNews.ts

lib/fetchNews.ts

```graphql
query MyQuery( # 自定義變數 MyQuery 也可以改成 aaa
   $access_key: String!
   $categories: String! # 型參
   $keywords: String
) {
   myQuery( # 調用 curl/index.graphql 的 type Query 的 myQuery
      access_key: $access_key
      categories: $categories # categories 的值是上面傳進來的 $categories
      countries: "gb"
      sort: "published_desc"
      keywords: $keywords
   )
```

上面 lib/fetchNews.ts 的這段程式會對應到下面 curl/index.graphql 的這段程式

```graphql
type Query {
  myQuery(
    access_key: String
    countries: String
    categories: String
    limit: String
    offset: String
    sort: String
    keywords: String
  ): Root @rest(endpoint: "http://api.mediastack.com/v1/news")
}
```
