import { WearableService } from '../../domain/wearable/wearable.service';

export class GarminWearable implements WearableService {
  validateProgress(wearableId: string, date: number) {
    if (!wearableId) return false;
    return date % 2 === 0;
  }
}
