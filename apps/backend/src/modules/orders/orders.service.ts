import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(orderData: any) {
    return this.prisma.order.create({
      data: orderData,
    });
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: 'PLACED' | 'CONFIRMED' | 'FULFILLED' | 'CANCELLED') {
    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}
