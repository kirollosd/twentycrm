import { useEffect } from 'react';

import { MULTI_OBJECT_RECORD_CLICK_OUTSIDE_LISTENER_ID } from '@/object-record/relation-picker/constants/MultiObjectRecordClickOutsideListenerId';
import { RIGHT_DRAWER_CLICK_OUTSIDE_LISTENER_ID } from '@/ui/layout/right-drawer/constants/RightDrawerClickOutsideListener';
import { useClickOutsideListener } from '@/ui/utilities/pointer-event/hooks/useClickOutsideListener';

export const MultipleObjectRecordOnClickOutsideEffect = ({
  containerRef,
  onClickOutside,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
  onClickOutside: () => void;
}) => {
  const { useListenClickOutside } = useClickOutsideListener(
    MULTI_OBJECT_RECORD_CLICK_OUTSIDE_LISTENER_ID,
  );

  const { toggleClickOutsideListener: toggleRightDrawerClickOustideListener } =
    useClickOutsideListener(RIGHT_DRAWER_CLICK_OUTSIDE_LISTENER_ID);

  useEffect(() => {
    toggleRightDrawerClickOustideListener(false);

    return () => {
      toggleRightDrawerClickOustideListener(true);
    };
  }, [toggleRightDrawerClickOustideListener]);

  useListenClickOutside({
    refs: [containerRef],
    callback: (event) => {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();

      onClickOutside();
    },
  });

  return <></>;
};
