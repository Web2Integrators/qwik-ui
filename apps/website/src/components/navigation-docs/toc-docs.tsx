import { component$ } from '@builder.io/qwik';
import { useAppState } from '~/_state/use-app-state';

import { LinkGroup } from './navigation-docs';

export default component$(() => {
  const linksGroups: LinkGroup[] = [
    {
      name: 'On this page',
      children: [
        { name: 'Showcase', href: '#where will this point to' },
        { name: 'FeatureList', href: '#where will this point to' },
        { name: 'CodeSnippet', href: '#where will this point to' },
      ],
    },
  ];

  const rootStore = useAppState();

  return (
    <nav
      class={`bg-background  inset-0 top-20 z-10 flex-col gap-4 overflow-y-auto border-r-[1px] pb-6 [grid-area:nav] lg:w-80
              ${rootStore.isSidebarOpened ? 'w-100 flex' : 'hidden lg:flex'} `}
    >
      {linksGroups?.map((group) => {
        return (
          <>
            <div class="px-6 pt-8">
              <h2 class="mb-2 border-b-2 p-2 font-bold lg:text-lg">{group.name}</h2>
              <ul class="flex flex-col gap-2">
                {group.children?.map((link) => {
                  const isLinkActive = true;
                  return (
                    <li key={link.name + link.href}>
                      <a
                        class={`transition-color ease-step hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex items-center rounded-lg px-4 py-2 text-xl duration-300
                           lg:text-sm ${
                             isLinkActive
                               ? 'bg-accent text-accent-foreground font-bold'
                               : 'text-muted-foreground font-medium'
                           }`}
                        href={link.href}
                        onClick$={() => {
                          rootStore.toclink = link.name;
                          console.log(
                            'rootStore.toclink',
                            rootStore.toclink,
                            'rootStore.toclink',
                          );
                        }}
                      >
                        <div class="flex w-full flex-row gap-2">
                          <div class="w-48">{link.name}</div>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        );
      })}
    </nav>
  );
});
