#!/usr/bin/env node
import fs from 'fs';
import { parseAuto } from './index';

function readStdin(): Promise<string> {
    return new Promise((resolve, reject) => {
        let data = '';
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', chunk => data += chunk);
        process.stdin.on('end', () => resolve(data));
        process.stdin.on('error', reject);
    });
}

async function main() {
    try {
        const args = process.argv.slice(2);
        let input: string;

        if (args.length === 0 || args[0] === '-') {
            if (process.stdin.isTTY) {
                console.error('Usage: text-to-json <file> | - for STDIN');
                process.exit(1);
            }
            input = await readStdin();
        } else {
            input = fs.readFileSync(args[0], 'utf8');
        }

        const parsed = parseAuto(input);
        process.stdout.write(JSON.stringify(parsed, null, 2));
    } catch (err) {
        console.error('Error:', err instanceof Error ? err.message : err);
        process.exit(1);
    }
}

main();
