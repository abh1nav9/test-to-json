#!/usr/bin/env node
import yaml from 'js-yaml';
import ini from 'ini';
import { parseKeyValue } from './parseKeyValue';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { Node } from 'unist';

export type AnyObject = Record<string, any>;

export function parseAuto(text: string): any {
    if (typeof text !== 'string') throw new TypeError('Expected a string');

    // 1) JSON
    try { return JSON.parse(text); } catch { }
    // 2) YAML
    try { return yaml.load(text); } catch { }
    // 3) INI
    try { return ini.parse(text); } catch { }
    // 4) key:value
    const kv = parseKeyValue(text);
    if (Object.keys(kv).length) return kv;

    // 5) Markdown
    const md = parseMarkdown(text);
    if (md) return md;

    // 6) fallback
    return { text };
}

function parseMarkdown(text: string): AnyObject | null {
    const tree = unified().use(remarkParse).parse(text) as Node;
    const out: AnyObject = {};
    let current: string | null = null;

    for (const node of ('children' in tree ? tree.children as Node[] : [])) {
        if (node.type === 'heading' && (node as any).depth === 1) {
            current = flatten(node);
            out[current] = [];
        } else if (node.type === 'list' && current) {
            out[current].push(
                (node as any).children.map((li: Node) => flatten(li))
            );
        } else if (node.type === 'paragraph') {
            out.paragraphs = out.paragraphs || [];
            out.paragraphs.push(flatten(node));
        }
    }
    return Object.keys(out).length ? out : null;

    function flatten(n: Node): string {
        // @ts-ignore
        if ((n as any).value != null) return String((n as any).value);
        if ('children' in n) return (n.children as Node[]).map(flatten).join('');
        return '';
    }
}
