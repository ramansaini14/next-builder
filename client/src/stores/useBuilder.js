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
];

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
			function findAndInsert(nodes) {
				for (const node of nodes) {
					if (node.id === parentId) {
						node.children.push(newBlock);
						return true;
					}
					if (findAndInsert(node.children)) return true;
				}
				return false;
			}
			findAndInsert(blocks);
		}
		set({ blocks, selectedId: newBlock.id });
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
}));