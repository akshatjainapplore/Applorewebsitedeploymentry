'use client';

import { useState } from 'react';
import { Plus, Trash2, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';
import type { ContentBlock, BlockType } from '@applore/types';
import RichTextEditor from './RichTextEditor';

interface BlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

const BLOCK_TYPES: { type: BlockType; label: string; icon: string }[] = [
  { type: 'hero', label: 'Hero', icon: '🦸' },
  { type: 'text', label: 'Text', icon: '📝' },
  { type: 'image', label: 'Image', icon: '🖼️' },
  { type: 'cta', label: 'CTA', icon: '🔗' },
  { type: 'grid', label: 'Grid', icon: '⊞' },
  { type: 'cards', label: 'Cards', icon: '🃏' },
  { type: 'testimonials', label: 'Testimonials', icon: '💬' },
  { type: 'faq', label: 'FAQ', icon: '❓' },
];

function getDefaultData(type: BlockType): Record<string, unknown> {
  switch (type) {
    case 'hero': return { heading: 'New Hero', subheading: '', description: '', ctaText: 'Get Started', ctaLink: '/', align: 'center' };
    case 'text': return { content: '<p>Start writing...</p>', align: 'left' };
    case 'image': return { src: '', alt: '', caption: '', fullWidth: false };
    case 'cta': return { heading: 'Call to Action', buttonText: 'Click Here', buttonLink: '/', buttonVariant: 'primary' };
    case 'grid': return { columns: 3, items: [{ id: '1', title: 'Item 1', description: '' }] };
    case 'cards': return { heading: 'Our Services', cards: [{ id: '1', title: 'Card 1', description: 'Description' }] };
    case 'testimonials': return { heading: 'Testimonials', testimonials: [{ id: '1', quote: 'Great!', author: 'John Doe', rating: 5 }] };
    case 'faq': return { heading: 'FAQ', items: [{ id: '1', question: 'Question?', answer: 'Answer.' }] };
    default: return {};
  }
}

export default function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const [showAddMenu, setShowAddMenu] = useState(false);

  function addBlock(type: BlockType) {
    const newBlock: ContentBlock = {
      id: Math.random().toString(36).slice(2),
      type,
      order: blocks.length,
      data: getDefaultData(type) as ContentBlock['data'],
    };
    onChange([...blocks, newBlock]);
    setShowAddMenu(false);
  }

  function updateBlock(id: string, data: Record<string, unknown>) {
    onChange(blocks.map((b) => b.id === id ? { ...b, data: data as ContentBlock['data'] } : b));
  }

  function removeBlock(id: string) {
    const remaining = blocks.filter((b) => b.id !== id);
    onChange(remaining.map((b, i) => ({ ...b, order: i })));
  }

  function moveBlock(id: string, direction: 'up' | 'down') {
    const idx = blocks.findIndex((b) => b.id === id);
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === blocks.length - 1) return;
    const newBlocks = [...blocks];
    const swap = direction === 'up' ? idx - 1 : idx + 1;
    [newBlocks[idx], newBlocks[swap]] = [newBlocks[swap], newBlocks[idx]];
    onChange(newBlocks.map((b, i) => ({ ...b, order: i })));
  }

  const sorted = [...blocks].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      {sorted.map((block, idx) => (
        <div key={block.id} className="border border-border rounded-lg bg-card overflow-hidden">
          {/* Block header */}
          <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border">
            <GripVertical size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium capitalize flex-1">
              {BLOCK_TYPES.find((t) => t.type === block.type)?.icon} {block.type}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => moveBlock(block.id, 'up')}
                disabled={idx === 0}
                className="p-1 rounded hover:bg-accent disabled:opacity-30"
              >
                <ChevronUp size={14} />
              </button>
              <button
                type="button"
                onClick={() => moveBlock(block.id, 'down')}
                disabled={idx === sorted.length - 1}
                className="p-1 rounded hover:bg-accent disabled:opacity-30"
              >
                <ChevronDown size={14} />
              </button>
              <button
                type="button"
                onClick={() => removeBlock(block.id)}
                className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {/* Block form */}
          <div className="p-4">
            <BlockForm block={block} onUpdate={(data) => updateBlock(block.id, data)} />
          </div>
        </div>
      ))}

      {/* Add block button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-primary transition-colors text-sm"
        >
          <Plus size={16} />
          Add Block
        </button>

        {showAddMenu && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-10 p-3">
            <div className="grid grid-cols-4 gap-2">
              {BLOCK_TYPES.map((bt) => (
                <button
                  key={bt.type}
                  type="button"
                  onClick={() => addBlock(bt.type)}
                  className="flex flex-col items-center gap-1 p-3 rounded-md hover:bg-accent transition-colors text-xs"
                >
                  <span className="text-2xl">{bt.icon}</span>
                  {bt.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BlockForm({ block, onUpdate }: { block: ContentBlock; onUpdate: (data: Record<string, unknown>) => void }) {
  const data = block.data as Record<string, unknown>;

  const update = (key: string, value: unknown) => onUpdate({ ...data, [key]: value });

  switch (block.type) {
    case 'hero':
      return (
        <div className="space-y-3">
          <Field label="Heading">
            <input type="text" value={(data.heading as string) || ''} onChange={(e) => update('heading', e.target.value)} className="field-input" />
          </Field>
          <Field label="Subheading">
            <input type="text" value={(data.subheading as string) || ''} onChange={(e) => update('subheading', e.target.value)} className="field-input" />
          </Field>
          <Field label="Description">
            <textarea value={(data.description as string) || ''} onChange={(e) => update('description', e.target.value)} rows={2} className="field-input" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="CTA Text">
              <input type="text" value={(data.ctaText as string) || ''} onChange={(e) => update('ctaText', e.target.value)} className="field-input" />
            </Field>
            <Field label="CTA Link">
              <input type="text" value={(data.ctaLink as string) || ''} onChange={(e) => update('ctaLink', e.target.value)} className="field-input" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Secondary CTA Text">
              <input type="text" value={(data.secondaryCtaText as string) || ''} onChange={(e) => update('secondaryCtaText', e.target.value)} className="field-input" />
            </Field>
            <Field label="Secondary CTA Link">
              <input type="text" value={(data.secondaryCtaLink as string) || ''} onChange={(e) => update('secondaryCtaLink', e.target.value)} className="field-input" />
            </Field>
          </div>
          <Field label="Background Image URL">
            <input type="text" value={(data.backgroundImage as string) || ''} onChange={(e) => update('backgroundImage', e.target.value)} className="field-input" placeholder="https://..." />
          </Field>
          <Field label="Alignment">
            <select value={(data.align as string) || 'center'} onChange={(e) => update('align', e.target.value)} className="field-input">
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </Field>
        </div>
      );

    case 'text':
      return (
        <div className="space-y-3">
          <Field label="Content">
            <RichTextEditor content={(data.content as string) || ''} onChange={(html) => update('content', html)} />
          </Field>
          <Field label="Alignment">
            <select value={(data.align as string) || 'left'} onChange={(e) => update('align', e.target.value)} className="field-input">
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </Field>
        </div>
      );

    case 'image':
      return (
        <div className="space-y-3">
          <Field label="Image URL">
            <input type="text" value={(data.src as string) || ''} onChange={(e) => update('src', e.target.value)} className="field-input" placeholder="https://..." />
          </Field>
          <Field label="Alt Text">
            <input type="text" value={(data.alt as string) || ''} onChange={(e) => update('alt', e.target.value)} className="field-input" />
          </Field>
          <Field label="Caption">
            <input type="text" value={(data.caption as string) || ''} onChange={(e) => update('caption', e.target.value)} className="field-input" />
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={(data.fullWidth as boolean) || false} onChange={(e) => update('fullWidth', e.target.checked)} />
            Full Width
          </label>
        </div>
      );

    case 'cta':
      return (
        <div className="space-y-3">
          <Field label="Heading">
            <input type="text" value={(data.heading as string) || ''} onChange={(e) => update('heading', e.target.value)} className="field-input" />
          </Field>
          <Field label="Description">
            <input type="text" value={(data.description as string) || ''} onChange={(e) => update('description', e.target.value)} className="field-input" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Button Text">
              <input type="text" value={(data.buttonText as string) || ''} onChange={(e) => update('buttonText', e.target.value)} className="field-input" />
            </Field>
            <Field label="Button Link">
              <input type="text" value={(data.buttonLink as string) || ''} onChange={(e) => update('buttonLink', e.target.value)} className="field-input" />
            </Field>
          </div>
          <Field label="Button Variant">
            <select value={(data.buttonVariant as string) || 'primary'} onChange={(e) => update('buttonVariant', e.target.value)} className="field-input">
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="outline">Outline</option>
            </select>
          </Field>
        </div>
      );

    case 'cards':
      return (
        <div className="space-y-3">
          <Field label="Section Heading">
            <input type="text" value={(data.heading as string) || ''} onChange={(e) => update('heading', e.target.value)} className="field-input" />
          </Field>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Cards</label>
            {((data.cards as Array<{ id: string; title: string; description: string; tag?: string; link?: string }>) || []).map((card, i) => (
              <div key={card.id} className="border border-border rounded p-3 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Title"
                    value={card.title}
                    onChange={(e) => {
                      const cards = [...((data.cards as typeof card[]) || [])];
                      cards[i] = { ...card, title: e.target.value };
                      update('cards', cards);
                    }}
                    className="field-input"
                  />
                  <input
                    type="text"
                    placeholder="Tag (optional)"
                    value={card.tag || ''}
                    onChange={(e) => {
                      const cards = [...((data.cards as typeof card[]) || [])];
                      cards[i] = { ...card, tag: e.target.value };
                      update('cards', cards);
                    }}
                    className="field-input"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Description"
                  value={card.description}
                  onChange={(e) => {
                    const cards = [...((data.cards as typeof card[]) || [])];
                    cards[i] = { ...card, description: e.target.value };
                    update('cards', cards);
                  }}
                  className="field-input"
                />
                <input
                  type="text"
                  placeholder="Link (optional)"
                  value={card.link || ''}
                  onChange={(e) => {
                    const cards = [...((data.cards as typeof card[]) || [])];
                    cards[i] = { ...card, link: e.target.value };
                    update('cards', cards);
                  }}
                  className="field-input"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const cards = [...((data.cards as Array<{ id: string; title: string; description: string }>) || [])];
                cards.push({ id: Math.random().toString(36).slice(2), title: `Card ${cards.length + 1}`, description: '' });
                update('cards', cards);
              }}
              className="text-xs text-primary hover:underline"
            >
              + Add Card
            </button>
          </div>
        </div>
      );

    case 'faq':
      return (
        <div className="space-y-3">
          <Field label="Section Heading">
            <input type="text" value={(data.heading as string) || ''} onChange={(e) => update('heading', e.target.value)} className="field-input" />
          </Field>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">FAQ Items</label>
            {((data.items as Array<{ id: string; question: string; answer: string }>) || []).map((item, i) => (
              <div key={item.id} className="border border-border rounded p-3 space-y-2">
                <input
                  type="text"
                  placeholder="Question"
                  value={item.question}
                  onChange={(e) => {
                    const items = [...((data.items as typeof item[]) || [])];
                    items[i] = { ...item, question: e.target.value };
                    update('items', items);
                  }}
                  className="field-input"
                />
                <textarea
                  placeholder="Answer"
                  value={item.answer}
                  rows={2}
                  onChange={(e) => {
                    const items = [...((data.items as typeof item[]) || [])];
                    items[i] = { ...item, answer: e.target.value };
                    update('items', items);
                  }}
                  className="field-input"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const items = [...((data.items as Array<{ id: string; question: string; answer: string }>) || [])];
                items.push({ id: Math.random().toString(36).slice(2), question: '', answer: '' });
                update('items', items);
              }}
              className="text-xs text-primary hover:underline"
            >
              + Add FAQ Item
            </button>
          </div>
        </div>
      );

    default:
      return <p className="text-sm text-muted-foreground">Block type &ldquo;{block.type}&rdquo; editor coming soon.</p>;
  }
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1 block">{label}</label>
      {children}
    </div>
  );
}
