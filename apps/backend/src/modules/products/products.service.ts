import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
  }) {
    const { skip = 0, take = 20, category, search, minPrice, maxPrice } = params;

    const where: any = {
      active: true,
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (minPrice !== undefined) {
      where.price = { gte: minPrice };
    }

    if (maxPrice !== undefined) {
      where.price = { ...where.price, lte: maxPrice };
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take,
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      products,
      total,
      skip,
      take,
    };
  }

  async findOne(slug: string) {
    return this.prisma.product.findUnique({
      where: { slug },
    });
  }

  async findCategories() {
    return this.prisma.category.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
    });
  }
}
