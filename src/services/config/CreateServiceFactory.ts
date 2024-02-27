import { IService } from "./Iservice";

export function createServiceFactory<T extends new (...args: any[]) => IService>(ServiceClass: T) {
    return (...args: ConstructorParameters<T>): InstanceType<T> => {
      return new ServiceClass(...args);
    };
  }

  