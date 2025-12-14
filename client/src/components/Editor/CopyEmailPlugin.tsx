import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot } from 'lexical';

export function CopyEmailPlugin() {
  const [editor] = useLexicalComposerContext();

  const copyContents = () => {
    let text = '';

    editor.update(() => {
      text = $getRoot().getTextContent();
    });

    const item = new ClipboardItem({
      'text/plain': new Blob([text], { type: 'text/plain' }),
    });

    void navigator.clipboard.write([item]);
  };

  return (
    <Button onClick={copyContents} className="mt-4 w-content">
      <Copy /> Copy Contents
    </Button>
  );
}