import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from 'src/orders/dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dtos';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  getAll(): any {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const ord = this.ordersService.getById(id);
    if (!ord) throw new NotFoundException('Order not found');
    return ord;
  }

  @Delete('/:id')
  deleteOrder(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.ordersService.getById(id))
      throw new NotFoundException('Order not found');
    this.ordersService.deleteOrder(id);
    return { success: true };
  }
  @Post('/')
  create(@Body() orderData: CreateOrderDTO) {
    return this.ordersService.create(orderData);
  }
  @Put('/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    if (!this.ordersService.getById(id))
      throw new NotFoundException('Product not found');

    this.ordersService.updateById(id, orderData);
    return { success: true };
  }
}
