import { useDraggable } from '@dnd-kit/core';
import { defaultPalette } from '../../stores/useBuilder';

function DraggableItem({ type, label }) {
	const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: `palette-${type}`, data: { type } });
	const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;
	return (
		<div ref={setNodeRef} style={style} {...listeners} {...attributes} className={`cursor-grab select-none rounded border bg-white px-3 py-2 text-sm shadow ${isDragging ? 'opacity-50' : ''}`}>
			{label}
		</div>
	);
}

export function Palette() {
	return (
		<div className="grid grid-cols-2 gap-2">
			{defaultPalette.map((item) => (
				<DraggableItem key={item.type} type={item.type} label={item.label} />
			))}
		</div>
	);
}