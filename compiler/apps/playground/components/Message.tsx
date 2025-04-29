/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  BanIcon,
  ExclamationIcon,
  InformationCircleIcon,
  XIcon,
} from '@heroicons/react/solid';
import { CustomContentProps, SnackbarContent, useSnackbar } from 'notistack';
import { forwardRef } from 'react';
import { MessageLevel, MessageSource } from '../lib/stores';

// https://notistack.com/examples/advanced/custom-component#custom-variant-(typescript)
declare module 'notistack' {
  interface VariantOverrides {
    message: {
      title: string;
      level: MessageLevel;
      codeframe: string | undefined;
    };
  }
}

interface MessageProps extends CustomContentProps {
  title: string;
  level: MessageLevel;
  source: MessageSource;
  codeframe: string | undefined;
}

// Function to render different icons based on message level
const getIcon = (level: MessageLevel) => {
  switch (level) {
    case MessageLevel.Warning:
      return (
        <ExclamationIcon className="w-5 h-5 text-amber-600" />
      );
    case MessageLevel.Error:
      return (
        <BanIcon className="w-5 h-5 text-red-600" />
      );
    case MessageLevel.Info:
    default:
      return (
        <InformationCircleIcon className="w-5 h-5 text-sky-600" />
      );
  }
};

const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ id, title, level, source, codeframe }, ref) => {
    const { closeSnackbar } = useSnackbar();
    const isDismissible = source !== MessageSource.Playground;

    return (
      <SnackbarContent
        ref={ref}
        className="flex items-start justify-between gap-3 px-4 py-3 text-sm bg-white border rounded-md shadow w-toast"
      >
        <div className="flex gap-3 w-toast-body">
          <div className="flex items-center justify-center flex-none rounded-md w-7 h-7">
            {getIcon(level)}
          </div>
          <div className="flex flex-col justify-center gap-1 w-toast-title">
            <p className="w-full">{title}</p>
            {codeframe && (
              <pre className="overflow-x-auto break-words whitespace-pre-wrap">
                <code className="text-xs">{codeframe}</code>
              </pre>
            )}
          </div>
        </div>
        {isDismissible && (
          <button
            className="flex items-center justify-center flex-none transition-colors duration-150 ease-in rounded-md justify-self-end group w-7 h-7 hover:bg-gray-200"
            onClick={() => closeSnackbar(id)}
            aria-label="Close message"
          >
            <XIcon className="w-5 h-5 fill-gray-500 group-hover:fill-gray-800" />
          </button>
        )}
      </SnackbarContent>
    );
  }
);

Message.displayName = 'MessageComponent';

export default Message;