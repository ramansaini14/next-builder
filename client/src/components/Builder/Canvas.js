import { useDroppable } from '@dnd-kit/core';
import { useEffect } from 'react';
import { useBuilder } from '../../stores/useBuilder';
import { Renderer } from './Renderer';

export function Canvas() {
	const { setNodeRef, isOver } = useDroppable({ id: 'canvas', data: { parentId: null } });
	const addBlock = useBuilder((s) => s.addBlock);
	useEffect(() => {
		function onCustomDrop(e) {
			const type = e.detail?.type;
			if (type) {
				addBlock(null, type);
			}
		}
		window.addEventListener('builder:drop', onCustomDrop);
		return () => window.removeEventListener('builder:drop', onCustomDrop);
	}, [addBlock]);
	return (
		<div ref={setNodeRef} className={`min-h-[400px] w-full rounded border bg-gray-50 p-4 ${isOver ? 'ring-2 ring-primary' : ''}`}>
			<Renderer />
		</div>
	);
}