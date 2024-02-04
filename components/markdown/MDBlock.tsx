import React, {FC, JSX} from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

type Props ={
    source: string
}
const MdBlock: FC<Props> = ({source}): JSX.Element => {
    return (
        <MarkdownPreview
            source={source}
            rehypeRewrite={(node, index, parent) => {
                // @ts-ignore
                if (node && node.tagName === "a" && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
                    parent.children = parent.children.slice(1)
                }
            }}
        />
    );
};

export default MdBlock;