export interface ReservationRequest {
    date: string;
    room: string|null;
    telephone: string|null;
    startTime: string|null;
    endTime: string|null;
}