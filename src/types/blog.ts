export type BlogPostFrontmatter = {
  title: string;
  description: string;
  date: string;
  author: string;
  cover: string;
  coverAlt: string;
  tags: string[];
  readingTime: string;
  isSample: boolean;
};

export type BlogPost = BlogPostFrontmatter & {
  slug: string;
  content: string;
};
