export interface Schedule {
    messageId?: string;
    recipient?: string;
    scheduledAtDate?: string;
    sendAtDate?: string;
    tag?: string;
}
export interface ScheduleLoadMatch {
    id: string;
}
export interface ScheduleListMatch {
    messageId?: string;
    recipient?: string;
    scheduledAtDate?: string;
    sendAtDate?: string;
    tag?: string;
}
export interface ScheduleUpdateData {
    id: string;
    messageId?: string;
    recipient?: string;
    scheduledAtDate?: string;
    sendAtDate?: string;
    tag?: string;
}
export interface ScheduleRemoveMatch {
    messageId?: string;
    recipient?: string;
    scheduledAtDate?: string;
    sendAtDate?: string;
    tag?: string;
}
export interface SendMessage {
}
export interface SendMessageCreateData {
}
