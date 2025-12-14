import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { InitialTextContentPlugin } from './InitialTextContentPlugin';
import { CopyEmailPlugin } from './CopyEmailPlugin';

function onError(error: Error) {
  console.error(error);
}

interface EditorProps {
  text: string;
}

export const Editor = ({ text }: EditorProps) => {
  const initialConfig = {
    namespace: 'EmailEditor',
    onError,
    nodes: [],
  };

  return (
    <div>

      <LexicalComposer initialConfig={initialConfig}>
        <div className='border-2 border-accent'>

          <RichTextPlugin
            contentEditable={<ContentEditable className="min-h-48 p-4" />}
            placeholder={<div className="text-muted-foreground">Start editing…</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />

          <HistoryPlugin />

          <InitialTextContentPlugin text={text} />
        </div>
        <CopyEmailPlugin />
      </LexicalComposer>
    </div>
  );
};
