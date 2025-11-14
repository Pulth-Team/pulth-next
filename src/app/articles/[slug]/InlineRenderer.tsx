import sanitizeHTML from "sanitize-html";

export default function InlineRenderer(props: { text: string }) {

    const cleanData = sanitizeHTML(props.text, {
        allowedTags: ['b', 'i', 'br', 'a',],
        // only allow href attribute on <a> tags
        // we set rel="nofollow noopener noreferrer" and target="_blank" by default for security reasons
        allowedAttributes: {'a': ['href', "target", "rel"]},
        allowedSchemes: ["http", "https", "mailto"],
        transformTags: {
            a: sanitizeHTML.simpleTransform('a', {rel: 'ugc nofollow', target: '_blank'}, true)
            // a: 'ul'
        }
    });
    console.log({text: props.text, clean: cleanData});

    return <span dangerouslySetInnerHTML={{__html: cleanData}}/>;
}