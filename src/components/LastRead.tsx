import { useEffect, useState } from 'preact/hooks';

export const localStorageKey = 'last-read';

export function savePost(title: string, slug: string) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({
        title,
        slug,
      })
    );
  }
}

type PostInfo = {
  title: string;
  slug: string;
};

export function readPostInfo(): PostInfo | null {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  const savedPost = localStorage.getItem(localStorageKey);

  if (savedPost === null) {
    return null;
  }

  const { title, slug } = JSON.parse(savedPost);

  if (!title || !slug) {
    return null;
  }

  return {
    title,
    slug,
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
      <a href={`/posts/${post.slug}/`}>Continue reading</a>
    </div>
  );
}

export function PostSaver({ title, slug }: PostInfo) {
  savePost(title, slug);
}
