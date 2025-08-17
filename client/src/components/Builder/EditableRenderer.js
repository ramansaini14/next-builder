import { useDroppable } from '@dnd-kit/core';
import { useBuilder } from '../../stores/useBuilder';

function DropZone({ id, position }) {
	const { setNodeRef, isOver } = useDroppable({ id: `${id}-${position}`, data: { insertRelativeTo: id, position } });
	return <div ref={setNodeRef} className={`h-2 w-full ${isOver ? 'bg-primary/50' : 'bg-transparent'}`} />;
}

function EditableWrapper({ node, children }) {
	const select = useBuilder((s) => s.select);
	const selectedId = useBuilder((s) => s.selectedId);
	const { setNodeRef, isOver } = useDroppable({ id: `container-${node.id}`, data: { containerId: node.id } });
	const selected = node.id === selectedId;
	return (
		<div className="relative">
			<DropZone id={node.id} position="before" />
			<div ref={setNodeRef} onClick={(e) => { e.stopPropagation(); select(node.id); }} className={`relative rounded ${selected ? 'ring-2 ring-primary' : 'ring-1 ring-gray-200'} ${isOver ? 'bg-blue-50/40' : ''}`}>
				{children}
			</div>
			<DropZone id={node.id} position="after" />
		</div>
	);
}

function EditableNode({ node }) {
	switch (node.type) {
		case 'section':
			return (
				<EditableWrapper node={node}>
					<section className={node.props.className || ''}>
						<div className="space-y-4">
							{node.children?.map((c) => <EditableNode key={c.id} node={c} />)}
						</div>
					</section>
				</EditableWrapper>
			);
		case 'heading':
			return (
				<EditableWrapper node={node}>
					<h2 className={`text-3xl font-bold ${node.props.className || ''}`}>{node.props.text || 'Heading'}</h2>
				</EditableWrapper>
			);
		case 'text':
			return (
				<EditableWrapper node={node}>
					<p className={`${node.props.className || ''}`}>{node.props.text || 'Lorem ipsum dolor sit amet...'}</p>
				</EditableWrapper>
			);
		case 'image':
			return (
				<EditableWrapper node={node}>
					{node.props.src ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img alt="" className={node.props.className || ''} src={node.props.src} />
					) : (
						<div className={`h-40 w-full bg-gray-200 ${node.props.className || ''}`} />
					)}
				</EditableWrapper>
			);
		case 'button':
			return (
				<EditableWrapper node={node}>
					<a href={node.props.href || '#'} className={`inline-block rounded bg-primary px-4 py-2 text-white ${node.props.className || ''}`}>{node.props.label || 'Click me'}</a>
				</EditableWrapper>
			);
		case 'divider':
			return (
				<EditableWrapper node={node}>
					<hr className={`border-t ${node.props.className || ''}`} />
				</EditableWrapper>
			);
		case 'spacer':
			return (
				<EditableWrapper node={node}>
					<div className={node.props.className || 'h-8'} />
				</EditableWrapper>
			);
		case 'video':
			return (
				<EditableWrapper node={node}>
					{node.props.src ? (
						<video className={node.props.className || ''} src={node.props.src} controls />
					) : (
						<div className={`h-48 w-full bg-gray-200 ${node.props.className || ''}`} />
					)}
				</EditableWrapper>
			);
		default:
			return null;
	}
}

export function EditableRenderer() {
	const blocks = useBuilder((s) => s.blocks);
	const select = useBuilder((s) => s.select);
	return (
		<div onClick={() => select(null)} className="space-y-4">
			{blocks.length === 0 && <div className="rounded border border-dashed p-8 text-center text-sm text-gray-500">Drag blocks here</div>}
			{blocks.map((node) => (
				<EditableNode key={node.id} node={node} />
			))}
		</div>
	);
}