import { useComputed$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { KitName } from '~/_state/kit-name.type';

export const useSelectedKit = () => {
  const { url } = useLocation();

  return useComputed$(() => {
    if (url.pathname.indexOf('headless') !== -1) {
      return KitName.HEADLESS;
    }

    if (url.pathname.indexOf('fluffy') !== -1) {
      return KitName.FLUFFY;
    }

    return KitName.NO_KIT;
  });
};
