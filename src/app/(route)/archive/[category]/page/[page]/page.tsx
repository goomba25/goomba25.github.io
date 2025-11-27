import { getPostsByCategory } from "@/_lib/postUtils";
import { CategoryLists } from "@/_lib/categoryLists";
import PostList from "@/app/_components/PostList";
import Pagination from "@/app/_components/Pagination";
import styles from "@/styles/_pages/archive.module.css";

export function generateStaticParams() {
  const paramsList = [];

  const allCategories = CategoryLists.flatMap(section =>
    section.items.map(item => item.slug)
  );

  for (const category of allCategories) {
    const posts = getPostsByCategory(category);
    const postsPerPage = 5;
    const totalPages = Math.ceil(posts.length / postsPerPage);

    for (let page = 1; page <= totalPages; page++) {
      paramsList.push({
        category,
        page: page.toString(),
      });
    }
  }

  return paramsList;
}


export default async function CategoryPagePage({
  params,
}: {
  params: { category: string; page: string };
}) {
  const posts = await getPostsByCategory(params.category);

  const page = Number(params.page);
  const postsPerPage = 5;

  const categoryItem: any = CategoryLists.flatMap(section => section.items)
    .find(item => item.slug === params.category);

  const displayName: string = categoryItem ? categoryItem.displayName : params.category;

  const currentPosts = posts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {displayName} ({posts.length})
      </h1>

      <PostList
        posts={currentPosts}
        category={params.category}
      />

      <Pagination
        totalPosts={posts.length}
        postsPerPage={postsPerPage}
        currentPage={page}
        category={params.category}
      />
    </div>
  );
}
