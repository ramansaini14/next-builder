import { useBuilder } from '../../stores/useBuilder';
import { useMemo } from 'react';

function findById(nodes, id) {
	for (const n of nodes) {
		if (n.id === id) return n;
		const child = findById(n.children, id);
		if (child) return child;
	}
	return null;
}

export function Inspector() {
	const blocks = useBuilder((s) => s.blocks);
	const selectedId = useBuilder((s) => s.selectedId);
	const updateProps = useBuilder((s) => s.updateProps);

	const selected = useMemo(() => findById(blocks, selectedId), [blocks, selectedId]);

	if (!selected) return <div className="text-sm text-gray-500">Select a block to edit its properties.</div>;

	return (
		<div className="space-y-4">
			<div>
				<label className="block text-xs text-gray-500">CSS classes</label>
				<input
					className="mt-1 w-full rounded border px-2 py-1 text-sm"
					value={selected.props.className || ''}
					onChange={(e) => updateProps(selected.id, { className: e.target.value })}
				/>
			</div>
			{selected.type === 'heading' && (
				<div>
					<label className="block text-xs text-gray-500">Text</label>
					<input
						className="mt-1 w-full rounded border px-2 py-1 text-sm"
						value={selected.props.text || ''}
						onChange={(e) => updateProps(selected.id, { text: e.target.value })}
					/>
				</div>
			)}
			{selected.type === 'text' && (
				<div>
					<label className="block text-xs text-gray-500">Text</label>
					<textarea
						className="mt-1 w-full rounded border px-2 py-1 text-sm"
						rows={5}
						value={selected.props.text || ''}
						onChange={(e) => updateProps(selected.id, { text: e.target.value })}
					/>
				</div>
			)}
			{selected.type === 'image' && (
				<div>
					<label className="block text-xs text-gray-500">Image URL</label>
					<input
						className="mt-1 w-full rounded border px-2 py-1 text-sm"
						value={selected.props.src || ''}
						onChange={(e) => updateProps(selected.id, { src: e.target.value })}
					/>
				</div>
			)}
			{selected.type === 'button' && (
				<div>
					<label className="block text-xs text-gray-500">Label</label>
					<input
						className="mt-1 w-full rounded border px-2 py-1 text-sm"
						value={selected.props.label || ''}
						onChange={(e) => updateProps(selected.id, { label: e.target.value })}
					/>
				</div>
			)}
		</div>
	);
}