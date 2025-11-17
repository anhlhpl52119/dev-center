import type { H3EventContext } from 'h3';
import type { AxiosNitroServiceModel } from 'seed-core/dist/service';

export interface H3EventContextExtend extends H3EventContext {
  axiosServer: AxiosNitroServiceModel;
}
