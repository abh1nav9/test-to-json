export function parseKeyValue(text: string): Record<string, any> {
    const out: Record<string, any> = {};

    for (let line of text.split(/\r?\n/)) {
        line = line.trim();
        if (!line) continue;
        const idx = line.indexOf(':');
        if (idx < 0) continue;

        const key = line.slice(0, idx).trim();
        let val = line.slice(idx + 1).trim();

        if (val.startsWith('"') && val.endsWith('"')) {
            val = val.slice(1, -1);
        } else if (
            (val.startsWith('{') && val.endsWith('}')) ||
            (val.startsWith('[') && val.endsWith(']'))
        ) {
            try {
                val = JSON.parse(val);
            } catch {
                try {
                    val = JSON.parse(val.replace(/'/g, '"'));
                } catch { }
            }
        }

        if (Object.prototype.hasOwnProperty.call(out, key)) {
            if (!Array.isArray(out[key])) out[key] = [out[key]];
            out[key].push(val);
        } else {
            out[key] = val;
        }
    }

    return out;
}
