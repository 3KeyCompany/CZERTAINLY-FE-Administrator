import { describe, expect, test } from 'vitest';
import { PqcVerdict } from 'types/openapi';
import { getPqcVerdictBadgeColor, getPqcVerdictDotClass } from './crypto-assets';

describe('getPqcVerdictBadgeColor', () => {
    test.each([
        [PqcVerdict.Ready, 'success'],
        [PqcVerdict.NotReady, 'danger'],
        [PqcVerdict.Unknown, 'warning'],
        [PqcVerdict.NotApplicable, 'secondary'],
    ])('%s maps to the %s badge', (verdict, expected) => {
        expect(getPqcVerdictBadgeColor(verdict)).toBe(expected);
    });

    test('every verdict keeps a text-safe surface fill: none maps to a solid-only colour', () => {
        const textSafe = ['success', 'danger', 'warning', 'secondary'];
        for (const verdict of Object.values(PqcVerdict)) {
            expect(textSafe).toContain(getPqcVerdictBadgeColor(verdict));
        }
    });
});

describe('getPqcVerdictDotClass', () => {
    test.each([
        [PqcVerdict.Ready, 'bg-success-solid'],
        [PqcVerdict.NotReady, 'bg-danger-solid'],
        [PqcVerdict.Unknown, 'bg-warning-solid'],
        [PqcVerdict.NotApplicable, 'bg-outline'],
    ])('%s takes the %s dot', (verdict, expected) => {
        expect(getPqcVerdictDotClass(verdict)).toBe(expected);
    });

    test('every dot is a semantic background utility, never a literal colour', () => {
        for (const verdict of Object.values(PqcVerdict)) {
            expect(getPqcVerdictDotClass(verdict)).toMatch(/^bg-[a-z-]+$/);
        }
    });
});
