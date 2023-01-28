import { client } from "./api";
import useSWRV from "swrv";
import useSwrvState from "./useSwrvState";
import { toRefs } from "vue";
import type { Event, EventCategory, PostType, Seat } from "./interfaces";

function useEvents(options = {}) {
  const fetcher = function () {
    return client("events").then((data) => data);
  };

  const { data, error, isValidating } = useSWRV<Event[]>("events", fetcher);

  const result = useSwrvState<Event[]>(data, error, isValidating);

  return toRefs(result);
}

function useSingleEvent(eventId: string) {
  const fetcher = function () {
    return client(`/events/${eventId}`).then((data) => data);
  };

  const { data, error, isValidating } = useSWRV<
    Event & { event_categories: EventCategory[] }
  >(`events-${eventId}`, fetcher);

  const result = useSwrvState<Event & { event_categories: EventCategory[] }>(
    data,
    error,
    isValidating
  );
  return toRefs(result);
}

function useSeatPlans(eventId: string, eventCategoryId: string) {
  const fetcher = function () {
    return client(`/seat-plans/${eventId}/${eventCategoryId}`).then(
      (data) => data
    );
  };

  const { data, error, isValidating } = useSWRV<Seat[]>(
    `seat-plans-${eventId}`,
    fetcher
  );
  const result = useSwrvState<Seat[]>(data, error, isValidating);
  return toRefs(result);
}


function usePricing() {
    const fetcher = function (data_:PostType) {
      return client(`/payment`,{data:data_}).then(
        (data) => data
      );
    };
  
    const { mutate,error,data, isValidating } = useSWRV<PostType>(
      `post-payent`,
      fetcher
    );
    const result = useSwrvState(data, error, isValidating);
    return toRefs({...result,mutate});
  }
export { useEvents, useSingleEvent, useSeatPlans, usePricing };
