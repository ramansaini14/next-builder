import { useDroppable } from '@dnd-kit/core';
import { useEffect } from 'react';
import { useBuilder } from '../../stores/useBuilder';
import { EditableRenderer } from './EditableRenderer';

export function Canvas() {
	const { setNodeRef, isOver } = useDroppable({ id: 'canvas-root', data: { containerId: null } });
	const addBlock = useBuilder((s) => s.addBlock);
	useEffect(() => {
		function onCustomDrop(e) {
			const type = e.detail?.type;
			const containerId = e.detail?.containerId ?? null;
			if (type) {
				addBlock(containerId, type);
			}
		}
		window.addEventListener('builder:drop', onCustomDrop);
		return () => window.removeEventListener('builder:drop', onCustomDrop);
	}, [addBlock]);
	return (
		<div ref={setNodeRef} className={`min-h-[400px] w-full rounded border bg-gray-50 p-4 ${isOver ? 'ring-2 ring-primary' : ''}`}>
			<EditableRenderer />
		</div>
	);
}