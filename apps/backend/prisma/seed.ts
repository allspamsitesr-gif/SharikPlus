const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sharikplus.ru' },
    update: {},
    create: {
      email: 'admin@sharikplus.ru',
      passwordHash: adminPassword,
      name: 'Администратор',
      role: 'ADMIN',
    },
  });

  // Create manager user
  const managerPassword = await bcrypt.hash('manager123', 12);
  const manager = await prisma.user.upsert({
    where: { email: 'manager@sharikplus.ru' },
    update: {},
    create: {
      email: 'manager@sharikplus.ru',
      passwordHash: managerPassword,
      name: 'Менеджер',
      role: 'MANAGER',
    },
  });

  // Create test user
  const userPassword = await bcrypt.hash('user123', 12);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      passwordHash: userPassword,
      name: 'Тестовый пользователь',
      role: 'USER',
    },
  });

  console.log('✅ Users created');

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'birthday' },
      update: {},
      create: {
        name: 'День рождения',
        slug: 'birthday',
        description: 'Воздушные шары для дня рождения',
        sortOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'wedding' },
      update: {},
      create: {
        name: 'Свадьба',
        slug: 'wedding',
        description: 'Свадебное оформление воздушными шарами',
        sortOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'corporate' },
      update: {},
      create: {
        name: 'Корпоратив',
        slug: 'corporate',
        description: 'Корпоративное оформление',
        sortOrder: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'holidays' },
      update: {},
      create: {
        name: 'Праздники',
        slug: 'holidays',
        description: 'Праздничное оформление',
        sortOrder: 4,
      },
    }),
  ]);

  console.log('✅ Categories created');

  // Create products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { sku: 'BALLOON-BIRTHDAY-001' },
      update: {},
      create: {
        name: 'Набор воздушных шаров "День рождения"',
        slug: 'balloon-birthday-set',
        description: 'Яркий набор воздушных шаров для празднования дня рождения. Включает разноцветные шары, ленты и декор.',
        price: 1500.00,
        comparePrice: 2000.00,
        sku: 'BALLOON-BIRTHDAY-001',
        barcode: '1234567890123',
        weight: 0.5,
        dimensions: { width: 30, height: 40, depth: 20 },
        featured: true,
        sortOrder: 1,
        metaTitle: 'Воздушные шары на день рождения - SharikPlus',
        metaDescription: 'Купить воздушные шары для дня рождения в Москве. Доставка, оформление, низкие цены.',
      },
    }),
    prisma.product.upsert({
      where: { sku: 'BALLOON-WEDDING-001' },
      update: {},
      create: {
        name: 'Арка из воздушных шаров "Свадебная"',
        slug: 'balloon-wedding-arch',
        description: 'Элегантная арка из воздушных шаров для свадебного торжества. Белые и золотые шары.',
        price: 5000.00,
        comparePrice: 6500.00,
        sku: 'BALLOON-WEDDING-001',
        barcode: '1234567890124',
        weight: 2.0,
        dimensions: { width: 300, height: 250, depth: 50 },
        featured: true,
        sortOrder: 2,
        metaTitle: 'Свадебная арка из воздушных шаров - SharikPlus',
        metaDescription: 'Свадебное оформление воздушными шарами. Арки, композиции, доставка в день торжества.',
      },
    }),
    prisma.product.upsert({
      where: { sku: 'BALLOON-CORP-001' },
      update: {},
      create: {
        name: 'Корпоративное оформление',
        slug: 'corporate-balloon-decoration',
        description: 'Профессиональное оформление офиса воздушными шарами для корпоративных мероприятий.',
        price: 8000.00,
        comparePrice: 10000.00,
        sku: 'BALLOON-CORP-001',
        barcode: '1234567890125',
        weight: 3.0,
        dimensions: { width: 500, height: 300, depth: 100 },
        featured: false,
        sortOrder: 3,
        metaTitle: 'Корпоративное оформление воздушными шарами - SharikPlus',
        metaDescription: 'Оформление офиса и корпоративных мероприятий воздушными шарами. Профессиональный подход.',
      },
    }),
  ]);

  console.log('✅ Products created');

  // Create coupons
  const coupons = await Promise.all([
    prisma.coupon.upsert({
      where: { code: 'WELCOME10' },
      update: {},
      create: {
        code: 'WELCOME10',
        type: 'PERCENTAGE',
        value: 10.00,
        minAmount: 1000.00,
        maxUses: 100,
        startsAt: new Date(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    }),
    prisma.coupon.upsert({
      where: { code: 'BIRTHDAY20' },
      update: {},
      create: {
        code: 'BIRTHDAY20',
        type: 'PERCENTAGE',
        value: 20.00,
        minAmount: 2000.00,
        maxUses: 50,
        startsAt: new Date(),
        expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
      },
    }),
  ]);

  console.log('✅ Coupons created');

  // Create sample order
  const order = await prisma.order.upsert({
    where: { orderNumber: 'ORD-2025-001' },
    update: {},
    create: {
      orderNumber: 'ORD-2025-001',
      userId: user.id,
      status: 'PLACED',
      total: 1500.00,
      subtotal: 1500.00,
      tax: 0.00,
      shipping: 0.00,
      discount: 0.00,
      customerName: 'Иван Иванов',
      customerEmail: 'ivan@example.com',
      customerPhone: '+7 (999) 123-45-67',
      shippingAddress: {
        firstName: 'Иван',
        lastName: 'Иванов',
        address1: 'ул. Примерная, д. 1, кв. 1',
        city: 'Москва',
        postalCode: '123456',
        country: 'RU',
        phone: '+7 (999) 123-45-67',
      },
      paymentMethod: 'offline',
      paymentStatus: 'PENDING',
      notes: 'Доставка в день рождения',
    },
  });

  console.log('✅ Sample order created');

  console.log('🎉 Database seeding completed!');
  console.log('');
  console.log('📋 Created:');
  console.log(`- ${categories.length} categories`);
  console.log(`- ${products.length} products`);
  console.log(`- ${coupons.length} coupons`);
  console.log('- 1 sample order');
  console.log('');
  console.log('👤 Test accounts:');
  console.log('- Admin: admin@sharikplus.ru / admin123');
  console.log('- Manager: manager@sharikplus.ru / manager123');
  console.log('- User: user@example.com / user123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
