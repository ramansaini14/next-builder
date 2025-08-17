import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import Link from 'next/link';
import { api } from '../../../lib/api';
import { useBuilder } from '../../../stores/useBuilder';
import { useAuth } from '../../../stores/useAuth';
import { Palette } from '../../../components/Builder/Palette';
import { Canvas } from '../../../components/Builder/Canvas';
import { Inspector } from '../../../components/Builder/Inspector';

export default function BuilderPage() {
	const router = useRouter();
	const { id } = router.query;
	const user = useAuth((s) => s.user);

	const blocks = useBuilder((s) => s.blocks);
	const setBlocks = useBuilder((s) => s.setBlocks);
	const addBlock = useBuilder((s) => s.addBlock);
	const insertBlockRelative = useBuilder((s) => s.insertBlockRelative);
	const moveBlockToContainer = useBuilder((s) => s.moveBlockToContainer);
	const moveBlockRelative = useBuilder((s) => s.moveBlockRelative);

	const [page, setPage] = useState(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 8 } });
	const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } });
	const sensors = useSensors(mouseSensor, touchSensor);

	useEffect(() => {
		if (!id) return;
		async function load() {
			const all = await api.listPages();
			const found = all.find((p) => p.id === id);
			if (!found) return router.replace('/admin');
			setPage(found);
			setBlocks(found.blocks || []);
			setLoading(false);
		}
		load();
	}, [id, router, setBlocks]);

	useEffect(() => {
		if (user === null) router.replace('/login');
	}, [user, router]);

	function handleDragEnd(event) {
		const { active, over } = event;
		if (!over) return;
		const isPalette = String(active.id).startsWith('palette-');
		const overData = over.data?.current || {};
		// Insert relative to a sibling
		if (overData.insertRelativeTo && overData.position) {
			if (isPalette) {
				const type = active.id.replace('palette-', '');
				insertBlockRelative({ siblingId: overData.insertRelativeTo, position: overData.position, type });
			} else {
				moveBlockRelative(active.id, { siblingId: overData.insertRelativeTo, position: overData.position });
			}
			return;
		}
		// Drop into a container
		if (Object.prototype.hasOwnProperty.call(overData, 'containerId')) {
			if (isPalette) {
				const type = active.id.replace('palette-', '');
				addBlock(overData.containerId ?? null, type);
			} else {
				moveBlockToContainer(active.id, overData.containerId ?? null);
			}
		}
	}

	async function save() {
		if (!page) return;
		setSaving(true);
		try {
			const payload = { ...page, blocks };
			const saved = await api.updatePage(page.id, payload);
			setPage(saved);
		} finally {
			setSaving(false);
		}
	}

	if (loading) return <main className="container py-8">Loading...</main>;

	return (
		<main className="container py-6">
			<div className="mb-4 flex items-center justify-between">
				<div>
					<h1 className="text-xl font-semibold">Editing: {page.title}</h1>
					<p className="text-xs text-gray-500">/{page.slug}</p>
				</div>
				<div className="flex items-center gap-2">
					<button onClick={save} className="rounded bg-primary px-4 py-2 text-white" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
					<Link className="rounded border px-4 py-2" href={`/${page.slug}`} target="_blank">Preview</Link>
					<Link className="rounded border px-4 py-2" href="/admin">Back</Link>
				</div>
			</div>
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-2 rounded border p-3">
					<h2 className="mb-2 text-sm font-medium text-gray-700">Blocks</h2>
					<Palette />
				</div>
				<div className="col-span-7 rounded border p-3">
					<DndContext sensors={sensors} onDragEnd={handleDragEnd}>
						<Canvas />
					</DndContext>
				</div>
				<div className="col-span-3 rounded border p-3">
					<h2 className="mb-2 text-sm font-medium text-gray-700">Inspector</h2>
					<Inspector />
				</div>
			</div>
		</main>
	);
}