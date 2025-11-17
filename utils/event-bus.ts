export interface BusEvent {
  name: string;
  callback: (p?: any, p2?: any) => any;
}

class Bus {
  // Event pool
  pools: { [race: string]: { [eventName: string]: Array<(p?: any) => any> } } = {};

  // Remove event listener
  remove(race: string, name: string, func: (p?: any) => any) {
    const targetRace = this.pools[race];
    const events = targetRace && this.pools[race][name];

    if (events) {
      this.pools[race][name] = events.filter((item: any) => item !== func);
    }
  }

  // Clear all events, as a single instance, multiple registrations will share content
  clear(race: string) {
    this.pools[race] = {};
  }

  // Register event listener
  on(race: string, event: BusEvent) {
    if (!this.pools[race]) {
      this.pools[race] = {};
    }

    if (!this.pools[race][event.name]) {
      this.pools[race][event.name] = [];
    }

    this.pools[race][event.name].push(event.callback);
    return this.pools[race][event.name].includes(event.callback);
  }

  // Trigger an event
  emit(race: string, name: string, ...params: any) {
    // There is a case where some components display without listening to events but trigger events. It is now considered a normal situation!
    if (!this.pools[race]) {
      this.pools[race] = {};
    }

    const targetRace = this.pools[race];
    const events = targetRace[name];

    if (events) {
      events.forEach((item: any) => {
        try {
          item(...params);
        } catch (error) {
          console.error(`${name} monitor event exception!`, error);
        }
      });
    }
  }
}

export default new Bus();
