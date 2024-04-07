export interface CoreQueryService {
  existsHabbit(habbitId: string): boolean;
  existsUser(userId: string): boolean;
}
