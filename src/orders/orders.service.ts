import { Injectable } from '@nestjs/common';
import { db, Orders } from './../db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  public getAll(): Orders[] {
    return db.orders;
  }
  public deleteOrder(id: Orders['id']): void {
    db.orders = db.orders.filter((o) => o.id !== id);
  }
  public getById(id: Orders['id']): Orders | null {
    return db.orders.find((p) => p.id === id);
  }
  public create(orderData: Omit<Orders, 'id'>): Orders {
    const newOrder = { ...orderData, id: uuidv4() };
    db.orders.push(newOrder);
    return newOrder;
  }
  public updateById(id: Orders['id'], orderData: Omit<Orders, 'id'>): void {
    db.orders = db.orders.map((o) => {
      if (o.id === id) {
        return { ...o, ...orderData };
      }
      return o;
    });
  }
}
