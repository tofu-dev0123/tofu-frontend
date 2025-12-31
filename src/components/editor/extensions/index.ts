import { markdown } from '@codemirror/lang-markdown';
import { Extension } from '@codemirror/state';
import { removeOutline, editorTheme } from './theme';
import { markdownKeymap } from './keymap';
import { editorPlaceholder } from './placeholder';
import { createUpdateListener } from './listener';

export function createExtensions(
  onChange: (value: string) => void
): Extension[] {
  return [
    markdown(),
    markdownKeymap,
    removeOutline,
    editorTheme,
    editorPlaceholder,
    createUpdateListener(onChange),
  ];
}
