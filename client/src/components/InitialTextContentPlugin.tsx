import { useEffect } from 'react';
import { $getRoot, $createParagraphNode, $createTextNode } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

interface InitialTextContentPluginProps {
  text: string;
}

export const InitialTextContentPlugin = ({ text }: InitialTextContentPluginProps) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!text) return;

    editor.update(() => {
      const root = $getRoot();
      root.clear();

      // Split on double newlines to create paragraphs
      const paragraphs = text.split(/\n\s*\n/);

      paragraphs.forEach((block) => {
        const paragraphNode = $createParagraphNode();

        block.split('\n').forEach((line, index) => {
          if (index > 0) {
            paragraphNode.append($createTextNode('\n'));
          }
          paragraphNode.append($createTextNode(line));
        });

        root.append(paragraphNode);
      });
    });
  }, [editor, text]);

  return null;
};
