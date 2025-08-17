import { useBuilder } from '../../stores/useBuilder';
import { useMemo } from 'react';
import { uploadFiles } from '../../lib/upload';

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
	const removeBlock = useBuilder((s) => s.removeBlock);

	const selected = useMemo(() => findById(blocks, selectedId), [blocks, selectedId]);

	if (!selected) return <div className="text-sm text-gray-500">Select a block to edit its properties.</div>;

	async function onUpload(e) {
		const files = Array.from(e.target.files || []);
		if (files.length === 0) return;
		const uploaded = await uploadFiles(files);
		if (uploaded.length > 0) updateProps(selected.id, { src: uploaded[0].url });
	}

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<p className="text-sm font-medium">{selected.type}</p>
				<button className="rounded border px-2 py-1 text-xs" onClick={() => removeBlock(selected.id)}>Delete</button>
			</div>
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
				<div className="space-y-2">
					<div>
						<label className="block text-xs text-gray-500">Image URL</label>
						<input
							className="mt-1 w-full rounded border px-2 py-1 text-sm"
							value={selected.props.src || ''}
							onChange={(e) => updateProps(selected.id, { src: e.target.value })}
						/>
					</div>
					<div>
						<label className="block text-xs text-gray-500">Upload</label>
						<input type="file" accept="image/*" onChange={onUpload} />
					</div>
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
					<label className="mt-3 block text-xs text-gray-500">Href</label>
					<input
						className="mt-1 w-full rounded border px-2 py-1 text-sm"
						value={selected.props.href || ''}
						onChange={(e) => updateProps(selected.id, { href: e.target.value })}
					/>
				</div>
			)}
			{selected.type === 'spacer' && (
				<div>
					<label className="block text-xs text-gray-500">Height (e.g. h-8)</label>
					<input
						className="mt-1 w-full rounded border px-2 py-1 text-sm"
						value={selected.props.className || 'h-8'}
						onChange={(e) => updateProps(selected.id, { className: e.target.value })}
					/>
				</div>
			)}
			{selected.type === 'video' && (
				<div>
					<label className="block text-xs text-gray-500">Video URL</label>
					<input
						className="mt-1 w-full rounded border px-2 py-1 text-sm"
						value={selected.props.src || ''}
						onChange={(e) => updateProps(selected.id, { src: e.target.value })}
					/>
				</div>
			)}
		</div>
	);
}