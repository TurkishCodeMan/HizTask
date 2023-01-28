interface BaseEntity {
  id: number;
}

export interface Event extends BaseEntity {
  title: string;
  description: string;
  image_url?: string;
  event_date: string;
  venue:Venue
}

export interface Venue extends BaseEntity {
  name: string;
  address: string;
}

export interface EventCategory extends BaseEntity {
  name: string;
  price: string;
}
export interface Seat extends BaseEntity {
  row: string;
  seat: number;
  isBooked: boolean;
}
export interface SeatPlan extends BaseEntity {
  venue: Venue;
  lists: Seat[];
}


export interface PostType {
    eventId:string,
    eventCategoryId:string,
    seats:number[],
    customer_name:string,
    customer_email:string,
    customer_surname:string,
    cc_number:string,
    cc_exp_month:number,
    cc_exp_year:number,
    cc_exp_cvv:number
}