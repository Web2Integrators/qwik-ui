import { component$, useStyles$ } from '@builder.io/qwik';
import { useAppState } from '~/_state/use-app-state';

import { useContent, useLocation } from '@builder.io/qwik-city';
import styles from './toc-docs.css?inline';

export default component$(() => {
  useStyles$(styles);
  const rootStore = useAppState();
  const { headings } = useContent();
  const contentHeadings = headings?.filter((h) => h.level <= 3) || [];

  const { url } = useLocation();

  const editUrl = `https://github.com/qwikifiers/qwik-ui/tree/main/apps/website/src/routes/${url.pathname}/index.mdx`;

  const OnThisPageMore = [
    {
      href: editUrl,
      text: 'Edit this Page',
    },
    {
      href: 'https://github.com/qwikifiers/qwik-ui/issues/new/choose',
      text: 'Create an issue',
    },

    {
      href: 'https://twitter.com/QwikUI',
      text: '@QwikUI',
    },
  ];

  return (
    <aside class="on-this-page fixed bottom-0 z-20 hidden  overflow-y-auto text-sm lg:block lg:w-[16rem]">
      {contentHeadings.length > 0 ? (
        <>
          <h2 class="mb-2 border-b-2 p-2 font-bold lg:text-lg">On this Page</h2>
          <ul class="px-2 font-medium text-[var(--interactive-text-color)]">
            {contentHeadings.map((h) => (
              <li
                key={h.id}
                class={`${
                  rootStore.mode === 'light' //Jay:todo: fix this
                    ? 'hover:bg-accent hover:text-accent-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground '
                }`}
              >
                <a
                  href={`#${h.id}`}
                  class={`${h.level > 2 ? 'ml-4' : null} on-this-page-item`}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <h6 class="py-4">More</h6>
      <ul class="px-4  font-medium text-[var(--interactive-text-color)]">
        {OnThisPageMore.map((el, index) => {
          return (
            <li
              class={`${
                rootStore.mode === 'light' //Jay:todo: fix this
                  ? 'hover:bg-accent hover:text-accent-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground '
              } rounded-lg py-1`}
              key={`more-items-on-this-page-${index}`}
            >
              <a class="more-item" href={el.href} rel="noopener" target="_blank">
                <span>{el.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
});
