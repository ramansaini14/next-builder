import { create } from 'zustand';
import { nanoid } from 'nanoid/non-secure';

function createBlock(type, props = {}) {
	return { id: nanoid(), type, props, children: [] };
}

export const defaultPalette = [
	{ type: 'section', label: 'Section' },
	{ type: 'heading', label: 'Heading' },
	{ type: 'text', label: 'Text' },
	{ type: 'image', label: 'Image' },
	{ type: 'button', label: 'Button' },
	{ type: 'divider', label: 'Divider' },
	{ type: 'spacer', label: 'Spacer' },
	{ type: 'video', label: 'Video' },
];

function findNodeAndParent(nodes, id, parent = null) {
	for (let i = 0; i < nodes.length; i++) {
		const node = nodes[i];
		if (node.id === id) return { parent, index: i, node };
		const result = findNodeAndParent(node.children, id, node);
		if (result) return result;
	}
	return null;
}

function isDescendant(rootNodes, maybeAncestorId, targetId) {
	function walk(nodes, seenAncestor) {
		for (const node of nodes) {
			const isAncestor = seenAncestor || node.id === maybeAncestorId;
			if (isAncestor && node.id === targetId) return true;
			if (walk(node.children, isAncestor)) return true;
		}
		return false;
	}
	return walk(rootNodes, false);
}

export const useBuilder = create((set, get) => ({
	blocks: [createBlock('section', { className: 'py-16 bg-white' })],
	selectedId: null,
	setBlocks(blocks) {
		set({ blocks });
	},
	addBlock(parentId, type) {
		const blocks = structuredClone(get().blocks);
		const newBlock = createBlock(type, {});
		if (!parentId) {
			blocks.push(newBlock);
		} else {
			const parentInfo = findNodeAndParent(blocks, parentId);
			if (parentInfo?.node) {
				parentInfo.node.children.push(newBlock);
			} else {
				blocks.push(newBlock);
			}
		}
		set({ blocks, selectedId: newBlock.id });
		return newBlock;
	},
	insertBlockRelative({ siblingId, position, type }) {
		const blocks = structuredClone(get().blocks);
		const newBlock = createBlock(type, {});
		const info = findNodeAndParent(blocks, siblingId);
		if (!info) {
			blocks.push(newBlock);
		} else {
			const parentChildren = info.parent ? info.parent.children : blocks;
			const idx = info.index + (position === 'after' ? 1 : 0);
			parentChildren.splice(idx, 0, newBlock);
		}
		set({ blocks, selectedId: newBlock.id });
		return newBlock;
	},
	removeBlock(id) {
		function remove(nodes) {
			return nodes.filter((n) => {
				n.children = remove(n.children);
				return n.id !== id;
			});
		}
		set({ blocks: remove(get().blocks), selectedId: null });
	},
	select(id) {
		set({ selectedId: id });
	},
	updateProps(id, nextProps) {
		function update(nodes) {
			for (const node of nodes) {
				if (node.id === id) {
					Object.assign(node.props, nextProps);
					return true;
				}
				if (update(node.children)) return true;
			}
			return false;
		}
		const blocks = structuredClone(get().blocks);
		update(blocks);
		set({ blocks });
	},
	moveBlockToContainer(blockId, parentId) {
		const blocks = structuredClone(get().blocks);
		if (parentId && isDescendant(blocks, blockId, parentId)) {
			return; // prevent moving into its own descendant
		}
		const src = findNodeAndParent(blocks, blockId);
		if (!src) return;
		const sourceChildren = src.parent ? src.parent.children : blocks;
		const [moved] = sourceChildren.splice(src.index, 1);
		if (!parentId) {
			blocks.push(moved);
		} else {
			const dest = findNodeAndParent(blocks, parentId);
			if (dest?.node) dest.node.children.push(moved);
			else blocks.push(moved);
		}
		set({ blocks });
	},
	moveBlockRelative(blockId, { siblingId, position }) {
		const blocks = structuredClone(get().blocks);
		const src = findNodeAndParent(blocks, blockId);
		const dst = findNodeAndParent(blocks, siblingId);
		if (!src || !dst) return;
		// prevent nonsense: inserting relative to itself
		if (blockId === siblingId) return;
		// remove from source
		const sourceChildren = src.parent ? src.parent.children : blocks;
		const [moved] = sourceChildren.splice(src.index, 1);
		// compute destination
		const destChildren = dst.parent ? dst.parent.children : blocks;
		let insertIndex = dst.index + (position === 'after' ? 1 : 0);
		// adjust index if removing earlier in same array and inserting after
		if (sourceChildren === destChildren && src.index < dst.index && position === 'after') {
			insertIndex -= 1;
		}
		destChildren.splice(insertIndex, 0, moved);
		set({ blocks });
	},
}));