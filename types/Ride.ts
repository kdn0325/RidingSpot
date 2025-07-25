export type Ride = {
  id: number;
  user_id: string;
  scooter_id: number;
  started_at: string;
  finished_at?: string | null;
};
