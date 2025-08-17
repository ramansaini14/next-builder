import Image from 'next/image';
import { useBuilder } from '../../stores/useBuilder';

function Block({ node }) {
	switch (node.type) {
		case 'section':
			return <section className={node.props.className || ''}>{node.children?.map((c) => <Block key={c.id} node={c} />)}</section>;
		case 'heading':
			return <h2 className={`text-3xl font-bold ${node.props.className || ''}`}>{node.props.text || 'Heading'}</h2>;
		case 'text':
			return <p className={`${node.props.className || ''}`}>{node.props.text || 'Lorem ipsum dolor sit amet...'}</p>;
		case 'image':
			return node.props.src ? (
				// eslint-disable-next-line @next/next/no-img-element
				<img alt="" className={node.props.className || ''} src={node.props.src} />
			) : (
				<div className={`h-40 w-full bg-gray-200 ${node.props.className || ''}`} />
			);
		case 'button':
			return <a href={node.props.href || '#'} className={`inline-block rounded bg-primary px-4 py-2 text-white ${node.props.className || ''}`}>{node.props.label || 'Click me'}</a>;
		case 'divider':
			return <hr className={`border-t ${node.props.className || ''}`} />;
		case 'spacer':
			return <div className={node.props.className || 'h-8'} />;
		case 'video':
			return node.props.src ? <video className={node.props.className || ''} src={node.props.src} controls /> : <div className={`h-48 w-full bg-gray-200 ${node.props.className || ''}`} />;
		default:
			return null;
	}
}

export function Renderer({ value }) {
	const blocks = value || useBuilder((s) => s.blocks);
	return (
		<div className="space-y-6">
			{blocks.map((node) => (
				<Block key={node.id} node={node} />
			))}
		</div>
	);
}