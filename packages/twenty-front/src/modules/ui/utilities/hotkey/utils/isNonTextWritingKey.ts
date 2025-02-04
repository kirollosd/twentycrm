export const isNonTextWritingKey = (key: string) => {
  const nonTextWritingKeys = [
    'Enter',
    'Tab',
    'Shift',
    'Escape',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Delete',
    'Backspace',
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'F6',
    'F7',
    'F8',
    'F9',
    'F10',
    'F11',
    'F12',
    'Meta',
    'Alt',
    'Control',
    'CapsLock',
    'NumLock',
    'ScrollLock',
    'Pause',
    'Insert',
    'Home',
    'PageUp',
    'Delete',
    'End',
    'PageDown',
    'ContextMenu',
    'PrintScreen',
    'BrowserBack',
    'BrowserForward',
    'BrowserRefresh',
    'BrowserStop',
    'BrowserSearch',
    'BrowserFavorites',
    'BrowserHome',
    'VolumeMute',
    'VolumeDown',
    'VolumeUp',
    'MediaTrackNext',
    'MediaTrackPrevious',
    'MediaStop',
    'MediaPlayPause',
  ];

  return nonTextWritingKeys.includes(key);
};
