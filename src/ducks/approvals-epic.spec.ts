import { describe, expect, test } from 'vitest';
import type { UnknownAction } from '@reduxjs/toolkit';
import { firstValueFrom, of } from 'rxjs';
import { take, toArray } from 'rxjs/operators';

import { actions as approvalActions } from './approvals';

enum ApprovalsEpicIndex {
    ApproveRecipient = 4,
    RejectRecipient = 6,
}

async function runEpic(epicIndex: ApprovalsEpicIndex, action: UnknownAction, approvalsApi: Record<string, (args: any) => any>) {
    const { default: epics } = await import('./approvals-epic');
    const deps = { apiClients: { approvals: approvalsApi } };
    const output$ = (epics as any)[epicIndex](of(action), of({}) as any, deps as any);
    return firstValueFrom(output$.pipe(take(2), toArray())) as Promise<UnknownAction[]>;
}

describe('approvals epics', () => {
    test('approveApprovalRecipient sends the comment and reloads the approval detail', async () => {
        const emitted = await runEpic(
            ApprovalsEpicIndex.ApproveRecipient,
            approvalActions.approveApprovalRecipient({ uuid: 'a1', userApproval: { comment: 'looks good' } }),
            {
                approveApprovalRecipient: ({ uuid, userApprovalDto }: { uuid: string; userApprovalDto: { comment?: string } }) => {
                    expect(uuid).toBe('a1');
                    expect(userApprovalDto).toEqual({ comment: 'looks good' });
                    return of(undefined);
                },
            },
        );

        expect(emitted).toEqual([
            approvalActions.approveApprovalRecipientSuccess({ uuid: 'a1' }),
            approvalActions.getApproval({ uuid: 'a1' }),
        ]);
    });

    test('rejectApprovalRecipient sends the comment and reloads the approval detail', async () => {
        const emitted = await runEpic(
            ApprovalsEpicIndex.RejectRecipient,
            approvalActions.rejectApprovalRecipient({ uuid: 'a1', userApproval: { comment: 'not allowed' } }),
            {
                rejectApprovalRecipient: ({ uuid, userApprovalDto }: { uuid: string; userApprovalDto: { comment?: string } }) => {
                    expect(uuid).toBe('a1');
                    expect(userApprovalDto).toEqual({ comment: 'not allowed' });
                    return of(undefined);
                },
            },
        );

        expect(emitted).toEqual([
            approvalActions.rejectApprovalRecipientSuccess({ uuid: 'a1' }),
            approvalActions.getApproval({ uuid: 'a1' }),
        ]);
    });
});
