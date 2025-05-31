import { Notifications } from '@mui/icons-material';
import React from 'react';

export interface NotificationProps {
  number?: number;
}

export const Notification = ({
  number,
}: NotificationProps) => {
  const transform =
    number && number < 10
      ? 'translate-x-1'
      : number && number < 100
        ? 'translate-x-1/3'
        : number && number < 1000
          ? 'translate-x-1/2'
          : 'translate-x-6';

  return (
    <div className='p-2 relative inline-block group'>
      <Notifications className='text-primary-400 group-hover:text-primary-600' />

      {number && number > 0 ? (
        <p className={`
          absolute top-0 right-0 px-2 py-1
          text-white-50 text-xs font-bold text-center
          bg-action-error rounded-full
          transform ${transform} -translate-y-1/5
        `}>
          {number}
        </p>
      ) : null}
    </div>
  );
};
