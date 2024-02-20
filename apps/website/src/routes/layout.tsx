import { Slot, component$, useStyles$ } from '@builder.io/qwik';
import { ContentMenu, useContent } from '@builder.io/qwik-city';
import { ComponentsStatusesMap, statusByComponent } from '~/_state/component-statuses';
import { KitName } from '~/_state/kit-name.type';
import Header from '~/components/header/header';
import docsStyles from './docs.css?inline';
import {
  DocsNavigation,
  LinkGroup,
  LinkProps,
} from '~/components/navigation-docs/navigation-docs';
import { useSelectedKit } from './docs/use-selected-kit';
import prismStyles from './prism.css?inline';

import '@fontsource-variable/inter';
import { MDXProvider } from '~/_state/MDXProvider';
import { components } from '~/components/mdx-components';
import TocDocs from '~/components/navigation-docs/toc-docs';

export default component$(() => {
  useStyles$(prismStyles);
  useStyles$(docsStyles);

  const { menuItemsGroups } = useKitMenuItems();

  return (
    <>
      <Header showBottomBorder={true} showVersion={true} />
      <MDXProvider components={components}>
        <div class="setup-grid-areas lg:grid-cols-custom-lg 2xl:grid-cols-custom-2xl grid">
          <div class=" [grid-area:nav]">
            <DocsNavigation linksGroups={menuItemsGroups} />
          </div>
          <main class="docs [grid-area:main]">
            <Slot />
          </main>
          <div class="[grid-area:toc]">
            <TocDocs />
          </div>
        </div>
      </MDXProvider>
      <footer></footer>
    </>
  );
});

function useKitMenuItems() {
  const selectedKitSig = useSelectedKit();
  const { menu } = useContent();

  let menuItemsGroups: LinkGroup[] | undefined = [];

  if (selectedKitSig.value === KitName.HEADLESS) {
    menuItemsGroups = decorateMenuItemsWithBadges(
      menu?.items,
      statusByComponent.headless,
    );
  }

  if (selectedKitSig.value === KitName.FLUFFY) {
    menuItemsGroups = decorateMenuItemsWithBadges(menu?.items, statusByComponent.fluffy);
  }

  return {
    menuItemsGroups,
  };
}

function decorateMenuItemsWithBadges(
  menuItems: ContentMenu[] | undefined,
  kitStatusesMap: ComponentsStatusesMap,
): LinkGroup[] | undefined {
  return menuItems?.map((item) => {
    return {
      name: item.text,
      children: item.items?.map((child) => {
        const link: LinkProps = {
          name: child.text,
          href: child.href,
        };
        if (kitStatusesMap[link.name]) {
          link.status = kitStatusesMap[link.name];
        }
        return link;
      }),
    };
  });
}
