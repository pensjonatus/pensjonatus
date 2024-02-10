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
    <a
      href={`/posts/${post.slug}/`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        border: '0.5px solid var(--text-color)',
        borderRadius: 'var(--box-border-radius)',
        padding: '1rem',
        textDecoration: 'none',
        lineHeight: 1,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
        fill="currentColor"
      >
        <path d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Z" />
      </svg>
      <div>Continue reading "{post.title}"</div>
    </a>
  );
}

export function PostSaver({ title, slug }: PostInfo) {
  savePost(title, slug);
}
