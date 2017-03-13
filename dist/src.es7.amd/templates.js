////////////////////////////////////
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //import { evaluate_string_width } from './view-services'
    ////////////////////////////////////
    function bookmark(bookmark, alternative) {
        let { label, url, weight, bgcolor, parsed_url, } = bookmark;
        label = label || url;
        let tachyons_classes = 'no-underline near-black ba dib tc';
        /* Experiment with smaller tiles
        const lw = evaluate_string_width(label)
        if (weight === 1 && lw <= 20)
            weight = 0
        else if (weight === 1 && lw <= 23) {
            weight = 0
            tachyons_classes += ` tracked-tight` // character spacing diminished
        }
        */
        if (label.length > 50)
            tachyons_classes += ` tracked-tight`; // character spacing diminished
        return `
<a class="grid-item grid-item--weight${alternative === -1 ? 0 : weight} ${tachyons_classes}"
	style="background-color: ${bgcolor};"
	href="${url}"
	title="${label}">
	<div class="overlay"></div>
	<span class="icon fl pt1"><img height="16" width="16" src='http://www.google.com/s2/favicons?domain=${parsed_url.hostname}' /></span>
	<span class="label">${label}</span>
</a>
`;
    }
    function bookmark_group(group, index) {
        const is_pinned_row = group.title.toLowerCase() === 'pinned';
        const alternative = is_pinned_row
            ? -1
            : index % 2;
        const items = group.bookmarks.map(b => bookmark(b, alternative)).join('');
        const title_html = is_pinned_row
            ? ''
            : `<div class="pa0 ma0 stamp dib">${group.title}</div>`;
        let tachyons_classes = 'pa0';
        return `
<div class="${tachyons_classes}">
	<div class="grid ${is_pinned_row ? 'pinned' : ''}">
		${title_html}
		${items}
	</div>
</div>
`;
    }
    function page(data) {
        const items = data.rows.map(bookmark_group).join('\n');
        return `
<h1 class="pa1 ma0 dn">${data.title}</h1>
${items}
`;
    }
    exports.page = page;
});
//# sourceMappingURL=templates.js.map