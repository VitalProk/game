import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    // todo: show fighter info (image, name, health, etc.)

    if (fighter) {
        const { name, health, attack, defense, source } = fighter;

        const attributes = {
            src: source,
            title: name,
            alt: name
        };

        const image = createElement({
            tagName: 'img',
            className: 'fighter-preview___img',
            attributes
        });

        fighterElement.appendChild(image);

        const nameFighter = createElement({
            tagName: 'div',
            className: 'fighter-preview__text'
        });
        nameFighter.innerText = `name: ${name}`;
        fighterElement.appendChild(nameFighter);

        const healthFighter = createElement({
            tagName: 'div',
            className: 'fighter-preview__text'
        });
        healthFighter.innerText = `health: ${health}`;
        fighterElement.appendChild(healthFighter);

        const attackFighter = createElement({
            tagName: 'div',
            className: 'fighter-preview__text'
        });
        attackFighter.innerText = `attack: ${attack}`;
        fighterElement.appendChild(attackFighter);

        const defenseFighter = createElement({
            tagName: 'div',
            className: 'fighter-preview__text'
        });
        defenseFighter.innerText = `defense: ${defense}`;
        fighterElement.appendChild(defenseFighter);
    }

    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
