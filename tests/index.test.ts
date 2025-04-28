import { parseAuto } from '../src/index';

describe('parseAuto', () => {
    it('parses key:value and JSON', () => {
        const blob = `
foo: "bar"
num: 123
arr: [1,2,3]
`;
        expect(parseAuto(blob)).toEqual({ foo: 'bar', num: 123, arr: [1, 2, 3] });
    });

    it('parses the tattoo shops sample', () => {
        const blob = `
0:""
0:"Based on the data retrieved from the unrealdb_server, I can provide you with information about tattoo shops in San Francisco. Here's a list of some notable tattoo shops and artists in the area:\n\n1. Ale Rosa ink - Tattoos\n   Address: 3991 17th St, San Francisco, CA 94114\n   Phone: (415) 949-8919\n\n2. Painted Monkey\n   Address: 4200 18th St #103, San Francisco, CA 94114\n   Phone: (415) 846-4042\n   Note: Also listed as a gay & lesbian organization\n\n3. Brian is sleepy (Brian Wall)\n   Address: 2000 Van Ness Ave Suite 212, San Francisco, CA 94109\n   Phone: (415) 776-0539\n\n4. Dermafilia\n   Address: 3182 21st St, San Francisco, CA 94110\n   Phone: (415) 757-0914\n\n5. 13 Bats Tattoo and Piercing Studio\n   Address: 1043 Valencia St, San Francisco, CA 94110\n   Phone: (415) 815-6669\n   Note: Also offers body piercing and ear piercing services\n\n6. Inkpress Studio\n   Address: 3051 Clement St, San Francisco, CA 94121\n\n7. Proper Tattoo\n   Address: 3150 18th St #276, San Francisco, CA 94110\n   Phone: (628) 282-0371\n\n8. Puzzle Piece Tattoo\n   Address: 4983 Mission St, San Francisco, CA 94112\n   Phone: (415) 347-7852\n\nThese are just a few of the many tattoo shops and artists available in San Francisco. Each shop may have its own specialties, styles, and artists. It's recommended to research their work, read reviews, and possibly visit the shops to find the best fit for your tattoo needs."
8:[{"type": "sources", "data": {"nodes": [{
    "id": "f607098c-e7f7-4d45-86f3-24d4b68390b6",
    "metadata": {},
    "score": 0.0,
    "text": "{'name': 'Ale Rosa ink - Tattoos', 'latlongs': '[37.762325979761705, -122.43707828669562]', 'address': 'Ale Rosa ink - Tattoos, 3991 17th St, San Francisco, CA 94114, United States'}"
}]}}]
8:[{"type": "events", "data": {"title": "msg"}}]
`;

        const result = parseAuto(blob);

        expect(Array.isArray(result["0"]) && result["0"].length === 2).toBe(true);
        expect(result["0"][1]).toMatch(/tattoo shops in San Francisco/);

        expect(Array.isArray(result["8"]) && result["8"].length === 2).toBe(true);
        const [sources, events] = result["8"];
        expect(Array.isArray(sources) && sources[0].type === 'sources').toBe(true);
        expect(Array.isArray(events) && events[0].type === 'events').toBe(true);
    });
});
