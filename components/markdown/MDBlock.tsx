import {FC, JSX} from 'react';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRewrite from "rehype-rewrite"

type Props = {
    source: string
}
const MdBlock: FC<Props> = ({source}): JSX.Element => {
    const plugins = [remarkGfm, rehypeAutolinkHeadings, rehypeRewrite];
    return (
        <Markdown remarkPlugins={plugins}>
            {source}
        </Markdown>
    );
};

export default MdBlock;