export class Trade {
  amount?:number;
  price?:number;
  time?:string;
  constructor(amount:number, price: number,timestamp:number ) {
    //specify your own constructor logic
    this.amount=amount;
    this.price = price;
    this.time = new Date(timestamp).toLocaleTimeString();
  }
}
