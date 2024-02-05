import { useEffect, useState } from 'preact/hooks';

export const localStorageKey = 'last-read';

export function savePost(title: string, slug: string) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(localStorageKey, `{{${title}}},{{${slug}}}`);
  }
}

type PostInfo = {
  title: string;
  slug: string;
};

function getWithoutQuotes(phrase: string): string {
  return phrase.substring(1, phrase.length - 1);
}

export function readPostInfo(): PostInfo | null {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  const savedPost = localStorage.getItem(localStorageKey);

  if (savedPost === null) {
    return null;
  }

  const matches = savedPost.match(/{{([^}]+)}},{{([^}]+)}}/);

  return {
    title: matches[1],
    slug: matches[2],
  };
}

export function LastRead() {
  const [post, setPost] = useState<PostInfo | undefined>();

  useEffect(() => {
    const savedPost = readPostInfo();

    if (savedPost) {
      setPost(savedPost);
    }
  }, []);

  if (!post) {
    return null;
  }

  return (
    <div>
      You recently read "{post.title}".{' '}
      <a href={`${import.meta.env.BASE_URL}/posts/${post.slug}/`}>
        Continue reading
      </a>
    </div>
  );
}

export function PostSaver({ title, slug }: PostInfo) {
  savePost(title, slug);
}
