"use server";

import { getUser } from "./auth";
import { queues } from "@/base/bullmq";
import { ScheduleVideoEnum, WorkflowType } from "@/base/constants";

export async function startGenerateScriptJob(type: WorkflowType, data: any, delay?: number) {
    const userId = await getUser().then((u) => u.id);
    const queue = queues[type];

    await queue.add(type, { ...data, userId, firstVideo: true }, { jobId: `immediate_${data.projectId}`, delay });
    return true;
}

// Should accept timezone?
export async function scheduleGenerateScriptJob(id: string, type: WorkflowType, data: any, schedule: ScheduleVideoEnum) {
    const userId = await getUser().then((u) => u.id);
    const queue = queues[type];

    // TODO: Switch this to rrule.
    const crons = {
        [ScheduleVideoEnum.ONCE_EVERY_TWO_DAYS]: "0 9 */2 * *",
        [ScheduleVideoEnum.ONCE_A_DAY]: "0 9 * * *",
        [ScheduleVideoEnum.TWICE_A_DAY]: "0 9,16 * * *",
    };

    await queue.add(`schedule_${id}`, { ...data, userId }, { repeatJobKey: `schedule_${id}`, repeat: { pattern: crons[schedule] } });
    return true;
}
