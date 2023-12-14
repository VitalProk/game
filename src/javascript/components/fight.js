import controls from '../../constants/controls';

export function getHitPower(fighter) {
    // return hit power
    const criticalHitChance = Math.random() + 1;
    const hitPower = fighter.attack * criticalHitChance;
    return hitPower;
}

export function getBlockPower(fighter) {
    // return block power
    const dodgeChance = Math.random() + 1;
    const blockPower = fighter.defense * dodgeChance;

    return blockPower;
}

export function getDamage(attacker, defender) {
    // return damage;
    const hitPower = getHitPower(attacker);
    const blockPower = getBlockPower(defender);
    const dodged = blockPower > hitPower;
    const damage = dodged ? 0 : hitPower - blockPower;

    return damage;
}

export function getDamageSuper(attacker) {
    // return damage;
    const hitPower = getHitPower(attacker);
    const damage = hitPower * 2;

    return damage;
}

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        // resolve the promise with the winner when fight is over
        const first = { ...firstFighter, isBlocking: false, isAttackSuper: true };
        const second = { ...secondFighter, isBlocking: false, isAttackSuper: true };
        const firstComb = controls.PlayerOneCriticalHitCombination;
        const secondComb = controls.PlayerTwoCriticalHitCombination;

        const pressKey = {
            KeyQ: false,
            KeyW: false,
            KeyE: false,
            KeyU: false,
            KeyI: false,
            KeyO: false
        };

        function handleKeyPress(event) {
            const key = event.code;

            if (key === firstComb[0]) {
                pressKey.KeyQ = true;
            } else if (key === firstComb[1]) {
                pressKey.KeyW = true;
            } else if (key === firstComb[2]) {
                pressKey.KeyE = true;
            } else if (key === secondComb[0]) {
                pressKey.KeyU = true;
            } else if (key === secondComb[1]) {
                pressKey.KeyI = true;
            } else if (key === secondComb[2]) {
                pressKey.KeyO = true;
            }

            if (key === controls.PlayerOneBlock) {
                first.isBlocking = true;
            } else if (key === controls.PlayerTwoBlock) {
                second.isBlocking = true;
            } else if (key === controls.PlayerOneAttack && !first.isBlocking) {
                if (second.isBlocking) {
                    const damage = 0;
                    second.health -= damage;
                } else {
                    const damage = getDamage(first, second);
                    second.health -= damage;
                }
            } else if (key === controls.PlayerTwoAttack && !second.isBlocking) {
                if (first.isBlocking) {
                    const damage = 0;
                    first.health -= damage;
                } else {
                    const damage = getDamage(second, first);
                    first.health -= damage;
                }
            } else if (pressKey.KeyQ && pressKey.KeyW && pressKey.KeyE && first.isAttackSuper) {
                const damage = getDamageSuper(first);
                second.health -= damage;
                first.isAttackSuper = false;

                setTimeout(() => {
                    first.isAttackSuper = true;
                }, 10000);
            } else if (pressKey.KeyU && pressKey.KeyI && pressKey.KeyO && second.isAttackSuper) {
                const damage = getDamageSuper(second);
                first.health -= damage;
                second.isAttackSuper = false;
                setTimeout(() => {
                    second.isAttackSuper = true;
                }, 10000);
            }
            if (first.health <= 0 || second.health <= 0) {
                document.removeEventListener('keydown', handleKeyPress);
            }
        }
        function handleKeyUp(event) {
            const key = event.code;
            if (key === controls.PlayerOneBlock) {
                first.isBlocking = false;
            } else if (key === controls.PlayerTwoBlock) {
                second.isBlocking = false;
            } else if (key === firstComb[0]) {
                pressKey.KeyQ = false;
            } else if (key === firstComb[1]) {
                pressKey.KeyW = false;
            } else if (key === firstComb[2]) {
                pressKey.KeyE = false;
            } else if (key === secondComb[0]) {
                pressKey.KeyU = false;
            } else if (key === secondComb[1]) {
                pressKey.KeyI = false;
            } else if (key === secondComb[2]) {
                pressKey.KeyO = false;
            }
        }
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('keyup', handleKeyUp);
        resolve();
    });
}
